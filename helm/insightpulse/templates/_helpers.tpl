{{/*
_helpers.tpl — Reusable template helpers for the InsightPulse Helm chart
*/}}

{{/*
Common labels applied to all resources
*/}}
{{- define "insightpulse.labels" -}}
app.kubernetes.io/name: insightpulse
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version }}
environment: {{ .Values.namespace }}
{{- end }}
