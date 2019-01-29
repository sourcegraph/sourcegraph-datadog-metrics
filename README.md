# Datadog metrics Sourcegraph extension

A [Sourcegraph extension](https://docs.sourcegraph.com/extensions) that allows jumps to the Datadog page for a metrics/instrumentation call in the code files.

[**🗃️ Source code**](https://github.com/sourcegraph/sourcegraph-datadog-metrics)

[**➕ Add to Sourcegraph**](https://sourcegraph.com/extensions/sourcegraph/datadog-metrics) (see [usage instructions](#usage) for self-hosted Sourcegraph instances)

## Features

Works on [Sourcegraph.com](https://sourcegraph.com), [self-hosted Sourcegraph instances](https://docs.sourcegraph.com/#quickstart), and on code hosts (via the [Sourcegraph browser extension](https://docs.sourcegraph.com/integration/browser_extension)).

- **Jump to graph on Datadog page** for standard metric/instrumentation calls

![Datadog extension screenshot](https://d2ddoduugvun08.cloudfront.net/items/3m1V0510370x0Q1e2O2x/Image%202019-01-07%20at%203.07.23%20PM.png "Datadog extension example")

## Usage

**Note:** Using this extension on private code in the Sourcegraph browser extension requires a self-hosted Sourcegraph instance (because it needs access to the contents of the current file).

1. Enable the `sourcegraph-datadog-metrics` extension:
   - On Sourcegraph.com, visit [https://sourcegraph.com/extensions/sourcegraph/datadog-metrics](https://sourcegraph.com/extensions/sourcegraph/datadog-metrics) to enable it.
   - On a self-hosted Sourcegraph instance, select **User menu > Extensions**, search for `sourcegraph/datadog-metrics`, and enable it.
2. Visit any code file containing datadog statsd metric/instrumentation calls on Sourcegraph.
3. Click on the Datadog link that appears at the end of the line of each Datadog metric/instrumentation call to open the associated graph in the Datadog page.

### On your code host

This extension adds the same features to code containing Datadog statsd code on your code host if you're using the [Sourcegraph browser extension](https://docs.sourcegraph.com/integration/browser_extension). To use it on your code host:

1. Follow the [usage steps](#usage) above to enable this `sourcegraph/datadog-metrics` extension.
1. Install the [Sourcegraph browser extension](https://docs.sourcegraph.com/integration/browser_extension).
   - If you're using it with a self-hosted Sourcegraph instance, enter the Sourcegraph instance URL into the Sourcegraph browser extension options menu. Then click the gear icon and enable *Experimental features: Use extensions*.
1. Visit files containing Datadog statsd code on your code host and click on the links rendered behind each Datadog statsd code that will send you to your Datadog account and show the graph of the metrics that this code generates.

![screenshot of using datadog-extension on GitHub](https://d2ddoduugvun08.cloudfront.net/items/01153p453B2H0x020t1c/Image%202019-01-14%20at%2012.40.48%20AM.png?X-CloudApp-Visitor-Id=2879273)
