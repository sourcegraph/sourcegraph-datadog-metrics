import { from } from 'rxjs'
import { filter, switchMap } from 'rxjs/operators'
import * as sourcegraph from 'sourcegraph'

const STATSD_PATTERN = /statsd\.[^\'\"]+\([\'\"]([^\'\"]+)[\'\"]\)*/gi

function decorateEditor(editor: sourcegraph.CodeEditor): void {
    const decorations: sourcegraph.TextDocumentDecoration[] = []
    const decorationType = sourcegraph.app.createDecorationType()
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
    editor.setDecorations(decorationType, decorations)
}

export function activate(context: sourcegraph.ExtensionContext): void {
    const activeEditor = from(sourcegraph.app.activeWindowChanges).pipe(
        filter((window): window is sourcegraph.Window => window !== undefined),
        switchMap(window => window.activeViewComponentChanges),
        filter((editor): editor is sourcegraph.CodeEditor => editor !== undefined)
    )

    if (sourcegraph.app.activeWindowChanges) {
        // When the active editor changes, publish new decorations.
        context.subscriptions.add(activeEditor.subscribe(decorateEditor))
    }
}

function buildUrl(metricName: string): URL {
    const url = new URL('https://app.datadoghq.com/metric/explorer')
    url.searchParams.set('exp_metric', metricName)
    return url
}
