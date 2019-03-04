# Datadog metrics Sourcegraph extension

A [Sourcegraph extension](https://docs.sourcegraph.com/extensions) that allows jumps to the Datadog page for a metrics/instrumentation call in the code files.

[**🗃️ Source code**](https://github.com/sourcegraph/sourcegraph-datadog-metrics)

[**➕ Add to Sourcegraph**](https://sourcegraph.com/extensions/sourcegraph/datadog-metrics) (see [usage instructions](#usage) for self-hosted Sourcegraph instances)

## Features

Works on [Sourcegraph.com](https://sourcegraph.com), [self-hosted Sourcegraph instances](https://docs.sourcegraph.com/#quickstart), and on code hosts (via the [Sourcegraph browser extension](https://docs.sourcegraph.com/integration/browser_extension)).

- **Jump to graph on Datadog page** for standard metric/instrumentation calls

![Datadog extension screenshot](https://d2ddoduugvun08.cloudfront.net/items/3m1V0510370x0Q1e2O2x/Image%202019-01-07%20at%203.07.23%20PM.png "Datadog extension example")

## Usage

1. Enable the `sourcegraph-datadog-metrics` extension:
   - On Sourcegraph.com, visit [https://sourcegraph.com/extensions/sourcegraph/datadog-metrics](https://sourcegraph.com/extensions/sourcegraph/datadog-metrics) to enable it.
   - On a self-hosted Sourcegraph instance, select **User menu > Extensions**, search for `sourcegraph/datadog-metrics`, and enable it.
2. Visit any code file containing datadog statsd metric/instrumentation calls on Sourcegraph.
3. Click on the Datadog link that appears at the end of the line of each Datadog metric/instrumentation call to open the associated graph in the Datadog page.
