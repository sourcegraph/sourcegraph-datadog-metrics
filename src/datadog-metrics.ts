import { combineLatest, from, Observable } from 'rxjs'
import * as sourcegraph from 'sourcegraph'

const STATSD_PATTERN = /statsd\.[^\'\"]+\([\'\"]([^\'\"]+)[\'\"]\)*/gi

export function activate(): void {
    function decorateEditors(editorsToUpdate: sourcegraph.CodeEditor[]): void {
        for (const editor of editorsToUpdate) {
            const decorations: sourcegraph.TextDocumentDecoration[] = []
            for (const [i, line] of editor.document.text!.split('\n').entries()) {
                let m: RegExpExecArray | null
                do {
                    m = STATSD_PATTERN.exec(line)
                    if (m) {
                        decorations.push({
                            range: new sourcegraph.Range(i, 0, i, 0),
                            isWholeLine: true,
                            after: {
                                backgroundColor: '#774b9e',
                                color: 'rgba(255, 255, 255, 0.8)',
                                contentText: ' View metric (Datadog) » ',
                                linkURL: buildUrl(m[1]).toString(),
                            },
                        })
                    }
                } while (m)
                STATSD_PATTERN.lastIndex = 0 // reset
            }
            const decorationType = sourcegraph.app.createDecorationType()
            setTimeout(() => editor.setDecorations(decorationType, decorations), 200)
        }
    }
    sourcegraph.workspace.onDidOpenTextDocument.subscribe(() =>
        decorateEditors(sourcegraph.app.activeWindow!.visibleViewComponents)
    )

    combineLatest(
        from(sourcegraph.app.activeWindowChanges),
        new Observable(subscriber => sourcegraph.configuration.subscribe(() => subscriber.next()))
    ).subscribe(([activeWindow]) => {
        if (activeWindow) {
            decorateEditors(sourcegraph.app.activeWindow!.visibleViewComponents)
        }
    })
}

function buildUrl(metricName: string): URL {
    const url = new URL('https://app.datadoghq.com/metric/explorer')
    url.searchParams.set('exp_metric', metricName)
    return url
}
