import { ref, reactive, computed, watch, onMounted, unref, withCtx, createTextVNode, toDisplayString, createVNode, Transition, openBlock, createBlock, createCommentVNode, withDirectives, vModelSelect, Fragment, renderList, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { router, Head, Link } from "@inertiajs/vue3";
import Chart from "chart.js/auto";
import ApexCharts from "apexcharts";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Analytics",
  __ssrInlineRender: true,
  props: {
    totalTasks: Number,
    completedTasks: Number,
    overdueTasks: Number,
    byStatus: Object,
    byPriority: Object,
    completionRate: Number,
    recentActivity: Object,
    workload: Object,
    search: String,
    taskSearch: String,
    teamMembers: { type: Array, default: () => [] },
    teamStats: { type: Object, default: () => ({ utilization: 0, lateTasks: 0 }) },
    projectsCompletion: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const loading = ref(false);
    const errorMessage = ref("");
    const searchTerm = ref(props.search || "");
    const taskSearchTerm = ref(props.taskSearch || "");
    const filters = reactive({
      statusFilter: "all",
      sortBy: "updated",
      showBottlenecks: false
    });
    const showBottleneckAlert = computed(() => {
      if (!filters.showBottlenecks) return false;
      return (props.teamMembers || []).some((m) => (m.workload || 0) >= 90);
    });
    const bottleneckMessage = computed(() => {
      const overloaded = (props.teamMembers || []).filter((m) => (m.workload || 0) >= 90);
      if (overloaded.length === 0) return "";
      return `${overloaded.map((m) => m.name).join(", ")} ${overloaded.length === 1 ? "is" : "are"} overloaded (90%+ capacity). Consider redistributing tasks.`;
    });
    const statusColors = {
      not_started: "#64748b",
      in_progress: "#3b82f6",
      blocked: "#ef4444",
      completed: "#22c55e",
      overdue: "#f97316"
    };
    const statusLegend = computed(() => {
      return Object.entries(props.byStatus || {}).map(([key, value]) => ({
        key,
        label: key.replace("_", " "),
        value,
        color: statusColors[key] || "#94a3b8"
      }));
    });
    const priorityColors = {
      low: "#22c55e",
      medium: "#f59e0b",
      high: "#ef4444",
      critical: "#7c3aed"
    };
    const priorityLegend = computed(() => {
      return Object.entries(props.byPriority || {}).map(([key, value]) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value,
        color: priorityColors[key] || "#94a3b8"
      }));
    });
    const sortedTeamMembers = computed(() => {
      const members = [...props.teamMembers || []];
      if (filters.sortBy === "workload_desc") {
        return members.sort((a, b) => (b.workload || 0) - (a.workload || 0));
      }
      if (filters.sortBy === "workload_asc") {
        return members.sort((a, b) => (a.workload || 0) - (b.workload || 0));
      }
      return members;
    });
    function getLoadColorClass(workload) {
      if (workload >= 90) return "text-red-600 dark:text-red-400";
      if (workload >= 75) return "text-amber-600 dark:text-amber-400";
      return "text-green-600 dark:text-green-400";
    }
    function getWorkloadBarClass(workload) {
      if (workload >= 90) return "bg-red-500";
      if (workload >= 75) return "bg-amber-500";
      return "bg-green-500";
    }
    let statusChart = null;
    let priorityChart = null;
    function initCharts() {
      const statusCtx = document.getElementById("statusChart");
      if (statusCtx && props.byStatus) {
        if (statusChart) statusChart.destroy();
        const labels = Object.keys(props.byStatus).map((k) => k.replace("_", " "));
        const data = Object.values(props.byStatus);
        const colors = Object.keys(props.byStatus).map((k) => statusColors[k] || "#94a3b8");
        statusChart = new Chart(statusCtx, {
          type: "doughnut",
          data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        });
      }
      const priorityEl = document.getElementById("priorityChart");
      if (priorityEl && props.byPriority) {
        if (priorityChart) {
          priorityChart.destroy();
          priorityChart = null;
        }
        const categories = Object.keys(props.byPriority).map((k) => k.charAt(0).toUpperCase() + k.slice(1));
        const series = Object.values(props.byPriority);
        const barColors = Object.keys(props.byPriority).map((k) => priorityColors[k] || "#94a3b8");
        priorityChart = new ApexCharts(priorityEl, {
          chart: { type: "bar", height: 260, background: "transparent", toolbar: { show: false } },
          series: [{ name: "Tasks", data: series }],
          xaxis: { categories, labels: { style: { colors: "#94a3b8" } } },
          yaxis: { labels: { style: { colors: "#94a3b8" } } },
          colors: barColors,
          plotOptions: { bar: { distributed: true, borderRadius: 4 } },
          legend: { show: false },
          grid: { borderColor: "#1e3a5f" },
          theme: { mode: "dark" }
        });
        priorityChart.render();
      }
    }
    let searchTimer = null;
    watch(searchTerm, (val) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        router.get(route("reports.analytics"), { search: val, task_search: taskSearchTerm.value }, { preserveState: true, preserveScroll: true });
      }, 400);
    });
    let taskSearchTimer = null;
    watch(taskSearchTerm, (val) => {
      clearTimeout(taskSearchTimer);
      taskSearchTimer = setTimeout(() => {
        router.get(route("reports.analytics"), { search: searchTerm.value, task_search: val }, { preserveState: true, preserveScroll: true });
      }, 400);
    });
    onMounted(() => {
      initCharts();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Task Monitoring Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 page-content"${_scopeId}>`);
            if (errorMessage.value) {
              _push2(`<div class="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"${_scopeId}><span${_scopeId}>${ssrInterpolate(errorMessage.value)}</span><button class="text-sm underline"${_scopeId}>Dismiss</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (loading.value) {
              _push2(`<div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl p-8 flex flex-col items-center gap-4"${_scopeId}><div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"${_scopeId}></div><p class="text-sm font-bold text-slate-600 dark:text-slate-300"${_scopeId}>Loading Task Monitoring Dashboard...</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="max-w-[1800px] mx-auto px-4 md:px-10 py-8"${_scopeId}><header class="mb-10"${_scopeId}><div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"${_scopeId}><div${_scopeId}><h1 class="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"${_scopeId}>📊 Task Monitoring Dashboard</h1><p class="text-slate-600 dark:text-slate-400 font-medium mt-2"${_scopeId}>Real-time overview of team tasks and workload distribution</p></div></div></header><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"${_scopeId}><div class="rounded-xl shadow-sm p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow"${_scopeId}><p class="text-xs uppercase tracking-wide font-mono text-cyan-400 font-bold"${_scopeId}>TOTAL</p><p class="text-3xl font-bold font-mono text-white mt-2"${_scopeId}>${ssrInterpolate(__props.totalTasks)}</p><p class="text-xs text-slate-500 mt-2"${_scopeId}>All tasks in system</p></div><div class="rounded-xl shadow-sm p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow"${_scopeId}><p class="text-xs uppercase tracking-wide font-mono text-green-300 font-bold"${_scopeId}>COMPLETED</p><p class="text-3xl font-bold font-mono text-white mt-2"${_scopeId}>${ssrInterpolate(__props.completedTasks)}</p><p class="text-xs text-slate-500 mt-2"${_scopeId}>Tasks finished</p></div><div class="rounded-xl shadow-sm p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow"${_scopeId}><p class="text-xs uppercase tracking-wide font-mono text-red-400 font-bold"${_scopeId}>OVERDUE</p><p class="text-3xl font-bold font-mono text-red-400 mt-2"${_scopeId}>${ssrInterpolate(__props.overdueTasks)}</p><p class="text-xs text-slate-500 mt-2"${_scopeId}>Bottlenecks - Need attention</p></div><div class="rounded-xl shadow-sm p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow"${_scopeId}><p class="text-xs uppercase tracking-wide font-mono text-indigo-300 font-bold"${_scopeId}>COMPLETION</p><p class="text-3xl font-bold font-mono text-white mt-2"${_scopeId}>${ssrInterpolate(__props.completionRate)}%</p><div class="mt-3 bg-slate-800 rounded-full h-2"${_scopeId}><div class="bg-cyan-500 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: __props.completionRate + "%" })}"${_scopeId}></div></div></div></div>`);
            if (showBottleneckAlert.value) {
              _push2(`<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl shadow-sm p-6 mb-8"${_scopeId}><div class="flex items-start gap-4"${_scopeId}><svg class="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"${_scopeId}></path></svg><div${_scopeId}><h3 class="font-bold text-red-900 dark:text-red-200 mb-1"${_scopeId}>⚠️ Team Member Overloaded</h3><p class="text-sm text-red-800 dark:text-red-300"${_scopeId}>${ssrInterpolate(bottleneckMessage.value)}</p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8 border border-slate-200 dark:border-slate-700"${_scopeId}><h3 class="font-bold text-slate-900 dark:text-white mb-4"${_scopeId}>🔍 Filters &amp; Sorting</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3"${_scopeId}>Filter by Status</label><select class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(filters.statusFilter) ? ssrLooseContain(filters.statusFilter, "all") : ssrLooseEqual(filters.statusFilter, "all")) ? " selected" : ""}${_scopeId}>All Status</option><option value="not_started"${ssrIncludeBooleanAttr(Array.isArray(filters.statusFilter) ? ssrLooseContain(filters.statusFilter, "not_started") : ssrLooseEqual(filters.statusFilter, "not_started")) ? " selected" : ""}${_scopeId}>Not Started</option><option value="in_progress"${ssrIncludeBooleanAttr(Array.isArray(filters.statusFilter) ? ssrLooseContain(filters.statusFilter, "in_progress") : ssrLooseEqual(filters.statusFilter, "in_progress")) ? " selected" : ""}${_scopeId}>In Progress</option><option value="blocked"${ssrIncludeBooleanAttr(Array.isArray(filters.statusFilter) ? ssrLooseContain(filters.statusFilter, "blocked") : ssrLooseEqual(filters.statusFilter, "blocked")) ? " selected" : ""}${_scopeId}>Blocked</option><option value="completed"${ssrIncludeBooleanAttr(Array.isArray(filters.statusFilter) ? ssrLooseContain(filters.statusFilter, "completed") : ssrLooseEqual(filters.statusFilter, "completed")) ? " selected" : ""}${_scopeId}>Completed</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3"${_scopeId}>Sort by Workload</label><select class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}><option value="updated"${ssrIncludeBooleanAttr(Array.isArray(filters.sortBy) ? ssrLooseContain(filters.sortBy, "updated") : ssrLooseEqual(filters.sortBy, "updated")) ? " selected" : ""}${_scopeId}>Recently Updated</option><option value="status"${ssrIncludeBooleanAttr(Array.isArray(filters.sortBy) ? ssrLooseContain(filters.sortBy, "status") : ssrLooseEqual(filters.sortBy, "status")) ? " selected" : ""}${_scopeId}>By Status</option><option value="project"${ssrIncludeBooleanAttr(Array.isArray(filters.sortBy) ? ssrLooseContain(filters.sortBy, "project") : ssrLooseEqual(filters.sortBy, "project")) ? " selected" : ""}${_scopeId}>By Project</option><option value="workload_desc"${ssrIncludeBooleanAttr(Array.isArray(filters.sortBy) ? ssrLooseContain(filters.sortBy, "workload_desc") : ssrLooseEqual(filters.sortBy, "workload_desc")) ? " selected" : ""}${_scopeId}>High Workload First</option><option value="workload_asc"${ssrIncludeBooleanAttr(Array.isArray(filters.sortBy) ? ssrLooseContain(filters.sortBy, "workload_asc") : ssrLooseEqual(filters.sortBy, "workload_asc")) ? " selected" : ""}${_scopeId}>Low Workload First</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3"${_scopeId}>Analysis</label><button class="${ssrRenderClass(["w-full px-4 py-2 rounded-lg text-sm font-bold transition-all", filters.showBottlenecks ? "bg-red-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"])}"${_scopeId}>${ssrInterpolate(filters.showBottlenecks ? "✓ Showing Bottlenecks" : "Highlight Bottlenecks")}</button></div></div>`);
            if (__props.recentActivity.links.length > 3) {
              _push2(`<div class="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4"${_scopeId}><div class="flex-1 flex justify-between sm:hidden"${_scopeId}>`);
              if (__props.recentActivity.prev_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.recentActivity.prev_page_url,
                  class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Previous `);
                    } else {
                      return [
                        createTextVNode(" Previous ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (__props.recentActivity.next_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.recentActivity.next_page_url,
                  class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Next `);
                    } else {
                      return [
                        createTextVNode(" Next ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.recentActivity.from)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.recentActivity.to)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.recentActivity.total)}</span> results </p></div><div${_scopeId}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"${_scopeId}><!--[-->`);
              ssrRenderList(__props.recentActivity.links, (link, key) => {
                _push2(`<!--[-->`);
                if (link.url === null) {
                  _push2(`<div class="${ssrRenderClass([{ "rounded-l-md": key === 0, "rounded-r-md": key === __props.recentActivity.links.length - 1 }, "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-400 dark:text-gray-500 rounded-l-md"])}"${_scopeId}>${link.label ?? ""}</div>`);
                } else {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url,
                    class: ["relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors", [
                      link.active ? "z-10 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
                      key === 0 ? "rounded-l-md" : "",
                      key === __props.recentActivity.links.length - 1 ? "rounded-r-md" : ""
                    ]]
                  }, null, _parent2, _scopeId));
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></nav></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-6"${_scopeId}><div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-gray-100"${_scopeId}>Workload Management</h3><div class="relative w-full md:w-64"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"${_scopeId}></path></svg></div><input${ssrRenderAttr("value", searchTerm.value)} type="text" placeholder="Search employee..." class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"${_scopeId}></div></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"${_scopeId}>Employee</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center"${_scopeId}>Total</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center"${_scopeId}>In Progress</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center"${_scopeId}>Overdue</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"${_scopeId}>Load Status</th></tr></thead><tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}>`);
            if (__props.workload.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-10 text-center text-gray-500 dark:text-gray-400"${_scopeId}>No employees found matching your search.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.workload.data, (user) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"${_scopeId}>${ssrInterpolate(user.name)}</td><td class="px-6 py-4 text-gray-600 dark:text-gray-400 text-center"${_scopeId}>${ssrInterpolate(user.total_tasks)}</td><td class="px-6 py-4 text-yellow-600 text-center font-semibold"${_scopeId}>${ssrInterpolate(user.in_progress_tasks)}</td><td class="px-6 py-4 text-red-600 text-center font-semibold"${_scopeId}>${ssrInterpolate(user.overdue_tasks)}</td><td class="px-6 py-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-[100px]"${_scopeId}><div class="${ssrRenderClass([{
                "bg-green-500": user.total_tasks <= 5,
                "bg-yellow-500": user.total_tasks > 5 && user.total_tasks <= 8,
                "bg-red-500": user.total_tasks > 8
              }, "h-2 rounded-full"])}" style="${ssrRenderStyle({ width: Math.min(user.total_tasks / 10 * 100, 100) + "%" })}"${_scopeId}></div></div><span class="${ssrRenderClass([{
                "text-red-600": user.total_tasks > 8,
                "text-yellow-600": user.total_tasks > 5 && user.total_tasks <= 8,
                "text-green-600": user.total_tasks <= 5
              }, "text-xs font-medium whitespace-nowrap"])}"${_scopeId}>${ssrInterpolate(user.total_tasks > 8 ? "Overloaded" : user.total_tasks > 5 ? "High Load" : "Balanced")}</span></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.workload.links.length > 3) {
              _push2(`<div class="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4"${_scopeId}><div class="flex-1 flex justify-between sm:hidden"${_scopeId}>`);
              if (__props.workload.prev_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.workload.prev_page_url,
                  class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Previous `);
                    } else {
                      return [
                        createTextVNode(" Previous ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (__props.workload.next_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.workload.next_page_url,
                  class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Next `);
                    } else {
                      return [
                        createTextVNode(" Next ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.workload.from)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.workload.to)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.workload.total)}</span> results </p></div><div${_scopeId}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"${_scopeId}><!--[-->`);
              ssrRenderList(__props.workload.links, (link, key) => {
                _push2(`<!--[-->`);
                if (link.url === null) {
                  _push2(`<div class="${ssrRenderClass([{ "rounded-l-md": key === 0, "rounded-r-md": key === __props.workload.links.length - 1 }, "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-400 dark:text-gray-500 rounded-l-md"])}"${_scopeId}>${link.label ?? ""}</div>`);
                } else {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url,
                    class: ["relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors", [
                      link.active ? "z-10 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
                      key === 0 ? "rounded-l-md" : "",
                      key === __props.workload.links.length - 1 ? "rounded-r-md" : ""
                    ]]
                  }, null, _parent2, _scopeId));
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></nav></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-12 gap-8 mb-8"${_scopeId}><div class="col-span-12 lg:col-span-8 space-y-6"${_scopeId}><div class="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl shadow-lg p-8 text-white"${_scopeId}><h3 class="text-2xl font-extrabold mb-2"${_scopeId}>📊 Visual Work Distribution</h3><p class="text-blue-100 text-sm"${_scopeId}>Real-time visualization of task status, priorities, and team progress</p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="relative priority-card rounded-2xl shadow-md p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow"${_scopeId}><div class="flex items-center justify-between mb-1"${_scopeId}><h4 class="font-bold font-mono text-cyan-200 text-sm"${_scopeId}>Task Status</h4><div class="chart-legend-top"${_scopeId}><!--[-->`);
            ssrRenderList(statusLegend.value, (s) => {
              _push2(`<div class="flex items-center gap-2 ml-3"${_scopeId}><span class="legend-swatch" style="${ssrRenderStyle({ background: s.color, boxShadow: "0 8px 20px " + (s.color + "33") })}"${_scopeId}></span><span class="text-xs text-slate-300"${_scopeId}>${ssrInterpolate(s.label)} <span class="text-xs text-slate-400"${_scopeId}>(${ssrInterpolate(s.value)})</span></span></div>`);
            });
            _push2(`<!--]--></div></div><p class="text-xs text-slate-400 mb-4"${_scopeId}>Task progression across all statuses</p><div style="${ssrRenderStyle({ "position": "relative", "height": "260px" })}"${_scopeId}><canvas id="statusChart"${_scopeId}></canvas></div></div><div class="relative rounded-2xl shadow-md p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow"${_scopeId}><div class="flex items-center justify-between mb-1"${_scopeId}><h4 class="font-bold font-mono text-cyan-200 text-sm"${_scopeId}>Priority Breakdown</h4><div class="chart-legend-top"${_scopeId}><!--[-->`);
            ssrRenderList(priorityLegend.value, (p) => {
              _push2(`<div class="flex items-center gap-2 ml-3"${_scopeId}><span class="legend-swatch" style="${ssrRenderStyle({ background: p.color, boxShadow: "0 8px 20px " + (p.color + "33") })}"${_scopeId}></span><span class="text-xs text-slate-300"${_scopeId}>${ssrInterpolate(p.label)} <span class="text-xs text-slate-400"${_scopeId}>(${ssrInterpolate(p.value)})</span></span></div>`);
            });
            _push2(`<!--]--></div></div><p class="text-xs text-slate-400 mb-4"${_scopeId}>High-priority items needing focus</p><div style="${ssrRenderStyle({ "position": "relative", "height": "260px" })}"${_scopeId}><div id="priorityChart"${_scopeId}></div></div></div></div><div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-blue-200 dark:border-slate-600"${_scopeId}><div class="grid grid-cols-3 gap-4"${_scopeId}><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.totalTasks)}</div><p class="text-xs text-slate-600 dark:text-slate-400 mt-1"${_scopeId}>Total Tasks Tracked</p></div><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-blue-600 dark:text-blue-400"${_scopeId}>${ssrInterpolate(__props.completedTasks)}</div><p class="text-xs text-slate-600 dark:text-slate-400 mt-1"${_scopeId}>Tasks Completed</p></div><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-red-600 dark:text-red-400"${_scopeId}>${ssrInterpolate(__props.overdueTasks)}</div><p class="text-xs text-slate-600 dark:text-slate-400 mt-1"${_scopeId}>Overdue Tasks</p></div></div></div></div><div class="col-span-12 lg:col-span-4 flex flex-col gap-6"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-lg font-bold text-slate-900 dark:text-white"${_scopeId}>🏁 Project Completion</h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>Completion rate per project (click to open)</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"${_scopeId}>`);
            if ((__props.projectsCompletion || []).length === 0) {
              _push2(`<div class="col-span-full text-slate-400 text-sm italic p-4"${_scopeId}>No project completion data available.</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.projectsCompletion, (proj) => {
              _push2(`<div class="rounded-2xl p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"${_scopeId}><div class="flex items-start justify-between gap-3"${_scopeId}><div class="min-w-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/projects/${proj.id}`,
                class: "font-semibold text-slate-900 dark:text-white truncate hover:underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(proj.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(proj.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<p class="text-xs text-slate-500 dark:text-slate-400 mt-1"${_scopeId}>${ssrInterpolate(proj.completed_tasks)} completed • ${ssrInterpolate(proj.total_tasks)} total</p></div><div class="flex flex-col items-end"${_scopeId}><div class="${ssrRenderClass(["px-2 py-1 rounded-full text-xs font-bold", proj.completion_rate >= 75 ? "bg-green-100 text-green-700" : proj.completion_rate >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"])}"${_scopeId}>${ssrInterpolate(proj.completion_rate)}% </div></div></div><div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-3 overflow-hidden"${_scopeId}><div class="${ssrRenderClass(["h-2.5 rounded-full transition-all", proj.completion_rate >= 75 ? "bg-green-500" : proj.completion_rate >= 50 ? "bg-amber-500" : "bg-red-500"])}" style="${ssrRenderStyle({ width: (proj.completion_rate || 0) + "%" })}"${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700 h-fit"${_scopeId}><h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6"${_scopeId}>👥 Team Workload Overview</h3><div class="space-y-6"${_scopeId}>`);
            if ((__props.teamMembers || []).length === 0) {
              _push2(`<div class="text-slate-400 text-sm italic text-center py-8"${_scopeId}>No team data found.</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(sortedTeamMembers.value, (member) => {
              _push2(`<div class="pb-6 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0"${_scopeId}><div class="flex justify-between items-center mb-3"${_scopeId}><div class="flex items-center gap-3 flex-grow min-w-0"${_scopeId}><div class="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"${_scopeId}>${ssrInterpolate((member.name || "U").charAt(0).toUpperCase())}</div><div class="min-w-0 flex-grow"${_scopeId}><p class="font-semibold text-slate-900 dark:text-white truncate"${_scopeId}>${ssrInterpolate(member.name)}</p><p class="text-xs text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(member.task_count || 0)} tasks</p></div></div><div class="flex flex-col items-end gap-1 ml-2"${_scopeId}><span class="${ssrRenderClass(["text-lg font-bold", getLoadColorClass(member.workload || 0)])}"${_scopeId}>${ssrInterpolate(Math.round(member.workload || 0))}% </span>`);
              if ((member.workload || 0) >= 90) {
                _push2(`<span class="text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded whitespace-nowrap"${_scopeId}>🚨 Overloaded</span>`);
              } else if ((member.workload || 0) >= 75) {
                _push2(`<span class="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded whitespace-nowrap"${_scopeId}>⚠️ High Load</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden"${_scopeId}><div class="${ssrRenderClass(["h-2.5 rounded-full transition-all", getWorkloadBarClass(member.workload || 0)])}" style="${ssrRenderStyle({ width: Math.min(100, member.workload || 0) + "%" })}"${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div></div><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-700"${_scopeId}><div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"${_scopeId}><h3 class="text-lg font-bold text-slate-900 dark:text-white"${_scopeId}>📝 Recent Activity (Last 7 Days)</h3><div class="relative w-full md:w-64"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"${_scopeId}></path></svg></div><input${ssrRenderAttr("value", taskSearchTerm.value)} type="text" placeholder="Search task..." class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"${_scopeId}></div></div>`);
            if (__props.recentActivity.data.length === 0) {
              _push2(`<div class="text-slate-400 text-sm italic text-center py-8"${_scopeId}>No activities found with current filters.</div>`);
            } else {
              _push2(`<div class="divide-y divide-slate-200 dark:divide-slate-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.recentActivity.data, (task) => {
                _push2(`<div class="py-4 first:pt-0 last:pb-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 px-4 -mx-4 rounded transition-colors"${_scopeId}><div class="flex justify-between items-start gap-4"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><p class="font-semibold text-slate-900 dark:text-white truncate"${_scopeId}>${ssrInterpolate(task.title)}</p><p class="text-sm text-slate-600 dark:text-slate-400 mt-1"${_scopeId}><span class="font-medium"${_scopeId}>Project:</span> ${ssrInterpolate(task.project?.name || "Unassigned")} <span class="mx-2"${_scopeId}>•</span><span class="font-medium"${_scopeId}>Assigned:</span> ${ssrInterpolate(task.assignee?.name || "Unassigned")}</p><p class="text-xs text-slate-500 dark:text-slate-500 mt-2"${_scopeId}>Updated: ${ssrInterpolate(new Date(task.updated_at).toLocaleDateString())}</p></div><span class="${ssrRenderClass([{
                  "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200": task.status === "not_started",
                  "bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-300": task.status === "in_progress",
                  "bg-orange-200 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300": task.status === "blocked",
                  "bg-green-500 text-white dark:bg-green-600": task.status === "completed"
                }, "px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"])}"${_scopeId}>${ssrInterpolate(task.status.replace("_", " ").toUpperCase())}</span></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (__props.recentActivity.links.length > 3) {
              _push2(`<div class="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4"${_scopeId}><div class="flex-1 flex justify-between sm:hidden"${_scopeId}>`);
              if (__props.recentActivity.prev_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.recentActivity.prev_page_url,
                  class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Previous `);
                    } else {
                      return [
                        createTextVNode(" Previous ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (__props.recentActivity.next_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.recentActivity.next_page_url,
                  class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Next `);
                    } else {
                      return [
                        createTextVNode(" Next ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.recentActivity.from)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.recentActivity.to)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.recentActivity.total)}</span> results </p></div><div${_scopeId}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"${_scopeId}><!--[-->`);
              ssrRenderList(__props.recentActivity.links, (link, key) => {
                _push2(`<!--[-->`);
                if (link.url === null) {
                  _push2(`<div class="${ssrRenderClass([{ "rounded-l-md": key === 0, "rounded-r-md": key === __props.recentActivity.links.length - 1 }, "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-400 dark:text-gray-500 rounded-l-md"])}"${_scopeId}>${link.label ?? ""}</div>`);
                } else {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url,
                    class: ["relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors", [
                      link.active ? "z-10 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
                      key === 0 ? "rounded-l-md" : "",
                      key === __props.recentActivity.links.length - 1 ? "rounded-r-md" : ""
                    ]]
                  }, null, _parent2, _scopeId));
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></nav></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-700 mt-8"${_scopeId}><h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6"${_scopeId}>🚨 Tasks at Risk (Overdue)</h3><div class="divide-y divide-slate-200 dark:divide-slate-700"${_scopeId}>`);
            if (!__props.recentActivity || __props.recentActivity.data.filter((t) => t.status !== "completed" && new Date(t.due_date) < /* @__PURE__ */ new Date()).length === 0) {
              _push2(`<div class="text-slate-400 text-sm italic p-4 text-center"${_scopeId}>No overdue tasks found.</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.recentActivity.data.filter((task) => task.status !== "completed" && task.due_date && new Date(task.due_date) < /* @__PURE__ */ new Date()).slice(0, 10), (t) => {
              _push2(`<div class="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"${_scopeId}><div class="font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(t.title)}</div><div class="text-sm text-slate-600 dark:text-slate-400 mt-1"${_scopeId}>Assigned: ${ssrInterpolate(t.assignee?.name || "Unassigned")}</div><div class="text-xs text-red-600 dark:text-red-400 mt-2"${_scopeId}>Due: ${ssrInterpolate(new Date(t.due_date).toLocaleDateString())}</div></div>`);
            });
            _push2(`<!--]--></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 page-content" }, [
                createVNode(Transition, { name: "fade" }, {
                  default: withCtx(() => [
                    errorMessage.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
                    }, [
                      createVNode("span", null, toDisplayString(errorMessage.value), 1),
                      createVNode("button", {
                        onClick: ($event) => errorMessage.value = "",
                        class: "text-sm underline"
                      }, "Dismiss", 8, ["onClick"])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(Transition, { name: "fade" }, {
                  default: withCtx(() => [
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "fixed inset-0 bg-black/30 flex items-center justify-center z-50"
                    }, [
                      createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl p-8 flex flex-col items-center gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" }),
                        createVNode("p", { class: "text-sm font-bold text-slate-600 dark:text-slate-300" }, "Loading Task Monitoring Dashboard...")
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "max-w-[1800px] mx-auto px-4 md:px-10 py-8" }, [
                  createVNode("header", { class: "mb-10" }, [
                    createVNode("div", { class: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight" }, "📊 Task Monitoring Dashboard"),
                        createVNode("p", { class: "text-slate-600 dark:text-slate-400 font-medium mt-2" }, "Real-time overview of team tasks and workload distribution")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" }, [
                    createVNode("div", { class: "rounded-xl shadow-sm p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow" }, [
                      createVNode("p", { class: "text-xs uppercase tracking-wide font-mono text-cyan-400 font-bold" }, "TOTAL"),
                      createVNode("p", { class: "text-3xl font-bold font-mono text-white mt-2" }, toDisplayString(__props.totalTasks), 1),
                      createVNode("p", { class: "text-xs text-slate-500 mt-2" }, "All tasks in system")
                    ]),
                    createVNode("div", { class: "rounded-xl shadow-sm p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow" }, [
                      createVNode("p", { class: "text-xs uppercase tracking-wide font-mono text-green-300 font-bold" }, "COMPLETED"),
                      createVNode("p", { class: "text-3xl font-bold font-mono text-white mt-2" }, toDisplayString(__props.completedTasks), 1),
                      createVNode("p", { class: "text-xs text-slate-500 mt-2" }, "Tasks finished")
                    ]),
                    createVNode("div", { class: "rounded-xl shadow-sm p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow" }, [
                      createVNode("p", { class: "text-xs uppercase tracking-wide font-mono text-red-400 font-bold" }, "OVERDUE"),
                      createVNode("p", { class: "text-3xl font-bold font-mono text-red-400 mt-2" }, toDisplayString(__props.overdueTasks), 1),
                      createVNode("p", { class: "text-xs text-slate-500 mt-2" }, "Bottlenecks - Need attention")
                    ]),
                    createVNode("div", { class: "rounded-xl shadow-sm p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow" }, [
                      createVNode("p", { class: "text-xs uppercase tracking-wide font-mono text-indigo-300 font-bold" }, "COMPLETION"),
                      createVNode("p", { class: "text-3xl font-bold font-mono text-white mt-2" }, toDisplayString(__props.completionRate) + "%", 1),
                      createVNode("div", { class: "mt-3 bg-slate-800 rounded-full h-2" }, [
                        createVNode("div", {
                          class: "bg-cyan-500 h-2 rounded-full transition-all duration-300",
                          style: { width: __props.completionRate + "%" }
                        }, null, 4)
                      ])
                    ])
                  ]),
                  createVNode(Transition, { name: "slide" }, {
                    default: withCtx(() => [
                      showBottleneckAlert.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl shadow-sm p-6 mb-8"
                      }, [
                        createVNode("div", { class: "flex items-start gap-4" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          createVNode("div", null, [
                            createVNode("h3", { class: "font-bold text-red-900 dark:text-red-200 mb-1" }, "⚠️ Team Member Overloaded"),
                            createVNode("p", { class: "text-sm text-red-800 dark:text-red-300" }, toDisplayString(bottleneckMessage.value), 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8 border border-slate-200 dark:border-slate-700" }, [
                    createVNode("h3", { class: "font-bold text-slate-900 dark:text-white mb-4" }, "🔍 Filters & Sorting"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3" }, "Filter by Status"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.statusFilter = $event,
                          class: "w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "all" }, "All Status"),
                          createVNode("option", { value: "not_started" }, "Not Started"),
                          createVNode("option", { value: "in_progress" }, "In Progress"),
                          createVNode("option", { value: "blocked" }, "Blocked"),
                          createVNode("option", { value: "completed" }, "Completed")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, filters.statusFilter]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3" }, "Sort by Workload"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.sortBy = $event,
                          class: "w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "updated" }, "Recently Updated"),
                          createVNode("option", { value: "status" }, "By Status"),
                          createVNode("option", { value: "project" }, "By Project"),
                          createVNode("option", { value: "workload_desc" }, "High Workload First"),
                          createVNode("option", { value: "workload_asc" }, "Low Workload First")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, filters.sortBy]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3" }, "Analysis"),
                        createVNode("button", {
                          onClick: ($event) => filters.showBottlenecks = !filters.showBottlenecks,
                          class: ["w-full px-4 py-2 rounded-lg text-sm font-bold transition-all", filters.showBottlenecks ? "bg-red-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"]
                        }, toDisplayString(filters.showBottlenecks ? "✓ Showing Bottlenecks" : "Highlight Bottlenecks"), 11, ["onClick"])
                      ])
                    ]),
                    __props.recentActivity.links.length > 3 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4"
                    }, [
                      createVNode("div", { class: "flex-1 flex justify-between sm:hidden" }, [
                        __props.recentActivity.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: __props.recentActivity.prev_page_url,
                          class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        __props.recentActivity.next_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: __props.recentActivity.next_page_url,
                          class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-700 dark:text-gray-300" }, [
                            createTextVNode(" Showing "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.recentActivity.from), 1),
                            createTextVNode(" to "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.recentActivity.to), 1),
                            createTextVNode(" of "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.recentActivity.total), 1),
                            createTextVNode(" results ")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("nav", {
                            class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                            "aria-label": "Pagination"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.recentActivity.links, (link, key) => {
                              return openBlock(), createBlock(Fragment, { key }, [
                                link.url === null ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: ["relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-400 dark:text-gray-500 rounded-l-md", { "rounded-l-md": key === 0, "rounded-r-md": key === __props.recentActivity.links.length - 1 }],
                                  innerHTML: link.label
                                }, null, 10, ["innerHTML"])) : (openBlock(), createBlock(unref(Link), {
                                  key: 1,
                                  href: link.url,
                                  class: ["relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors", [
                                    link.active ? "z-10 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
                                    key === 0 ? "rounded-l-md" : "",
                                    key === __props.recentActivity.links.length - 1 ? "rounded-r-md" : ""
                                  ]],
                                  innerHTML: link.label
                                }, null, 8, ["href", "class", "innerHTML"]))
                              ], 64);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-6" }, [
                    createVNode("div", { class: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6" }, [
                      createVNode("h3", { class: "font-semibold text-gray-900 dark:text-gray-100" }, "Workload Management"),
                      createVNode("div", { class: "relative w-full md:w-64" }, [
                        createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-gray-400",
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                          type: "text",
                          placeholder: "Search employee...",
                          class: "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchTerm.value]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" }, [
                        createVNode("thead", { class: "bg-gray-50 dark:bg-gray-700" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase" }, "Employee"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center" }, "Total"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center" }, "In Progress"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase text-center" }, "Overdue"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase" }, "Load Status")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700" }, [
                          __props.workload.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "5",
                              class: "px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                            }, "No employees found matching your search.")
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.workload.data, (user) => {
                            return openBlock(), createBlock("tr", {
                              key: user.id
                            }, [
                              createVNode("td", { class: "px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap" }, toDisplayString(user.name), 1),
                              createVNode("td", { class: "px-6 py-4 text-gray-600 dark:text-gray-400 text-center" }, toDisplayString(user.total_tasks), 1),
                              createVNode("td", { class: "px-6 py-4 text-yellow-600 text-center font-semibold" }, toDisplayString(user.in_progress_tasks), 1),
                              createVNode("td", { class: "px-6 py-4 text-red-600 text-center font-semibold" }, toDisplayString(user.overdue_tasks), 1),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("div", { class: "flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-[100px]" }, [
                                    createVNode("div", {
                                      class: ["h-2 rounded-full", {
                                        "bg-green-500": user.total_tasks <= 5,
                                        "bg-yellow-500": user.total_tasks > 5 && user.total_tasks <= 8,
                                        "bg-red-500": user.total_tasks > 8
                                      }],
                                      style: { width: Math.min(user.total_tasks / 10 * 100, 100) + "%" }
                                    }, null, 6)
                                  ]),
                                  createVNode("span", {
                                    class: ["text-xs font-medium whitespace-nowrap", {
                                      "text-red-600": user.total_tasks > 8,
                                      "text-yellow-600": user.total_tasks > 5 && user.total_tasks <= 8,
                                      "text-green-600": user.total_tasks <= 5
                                    }]
                                  }, toDisplayString(user.total_tasks > 8 ? "Overloaded" : user.total_tasks > 5 ? "High Load" : "Balanced"), 3)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    __props.workload.links.length > 3 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4"
                    }, [
                      createVNode("div", { class: "flex-1 flex justify-between sm:hidden" }, [
                        __props.workload.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: __props.workload.prev_page_url,
                          class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        __props.workload.next_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: __props.workload.next_page_url,
                          class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-700 dark:text-gray-300" }, [
                            createTextVNode(" Showing "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.workload.from), 1),
                            createTextVNode(" to "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.workload.to), 1),
                            createTextVNode(" of "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.workload.total), 1),
                            createTextVNode(" results ")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("nav", {
                            class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                            "aria-label": "Pagination"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.workload.links, (link, key) => {
                              return openBlock(), createBlock(Fragment, { key }, [
                                link.url === null ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: ["relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-400 dark:text-gray-500 rounded-l-md", { "rounded-l-md": key === 0, "rounded-r-md": key === __props.workload.links.length - 1 }],
                                  innerHTML: link.label
                                }, null, 10, ["innerHTML"])) : (openBlock(), createBlock(unref(Link), {
                                  key: 1,
                                  href: link.url,
                                  class: ["relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors", [
                                    link.active ? "z-10 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
                                    key === 0 ? "rounded-l-md" : "",
                                    key === __props.workload.links.length - 1 ? "rounded-r-md" : ""
                                  ]],
                                  innerHTML: link.label
                                }, null, 8, ["href", "class", "innerHTML"]))
                              ], 64);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "grid grid-cols-12 gap-8 mb-8" }, [
                    createVNode("div", { class: "col-span-12 lg:col-span-8 space-y-6" }, [
                      createVNode("div", { class: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl shadow-lg p-8 text-white" }, [
                        createVNode("h3", { class: "text-2xl font-extrabold mb-2" }, "📊 Visual Work Distribution"),
                        createVNode("p", { class: "text-blue-100 text-sm" }, "Real-time visualization of task status, priorities, and team progress")
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "relative priority-card rounded-2xl shadow-md p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow" }, [
                          createVNode("div", { class: "flex items-center justify-between mb-1" }, [
                            createVNode("h4", { class: "font-bold font-mono text-cyan-200 text-sm" }, "Task Status"),
                            createVNode("div", { class: "chart-legend-top" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(statusLegend.value, (s) => {
                                return openBlock(), createBlock("div", {
                                  key: s.key,
                                  class: "flex items-center gap-2 ml-3"
                                }, [
                                  createVNode("span", {
                                    class: "legend-swatch",
                                    style: { background: s.color, boxShadow: "0 8px 20px " + (s.color + "33") }
                                  }, null, 4),
                                  createVNode("span", { class: "text-xs text-slate-300" }, [
                                    createTextVNode(toDisplayString(s.label) + " ", 1),
                                    createVNode("span", { class: "text-xs text-slate-400" }, "(" + toDisplayString(s.value) + ")", 1)
                                  ])
                                ]);
                              }), 128))
                            ])
                          ]),
                          createVNode("p", { class: "text-xs text-slate-400 mb-4" }, "Task progression across all statuses"),
                          createVNode("div", { style: { "position": "relative", "height": "260px" } }, [
                            createVNode("canvas", { id: "statusChart" })
                          ])
                        ]),
                        createVNode("div", { class: "relative rounded-2xl shadow-md p-6 border border-[#0f1724] bg-[#071426] text-cyan-200 hover:shadow-lg transition-shadow" }, [
                          createVNode("div", { class: "flex items-center justify-between mb-1" }, [
                            createVNode("h4", { class: "font-bold font-mono text-cyan-200 text-sm" }, "Priority Breakdown"),
                            createVNode("div", { class: "chart-legend-top" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(priorityLegend.value, (p) => {
                                return openBlock(), createBlock("div", {
                                  key: p.key,
                                  class: "flex items-center gap-2 ml-3"
                                }, [
                                  createVNode("span", {
                                    class: "legend-swatch",
                                    style: { background: p.color, boxShadow: "0 8px 20px " + (p.color + "33") }
                                  }, null, 4),
                                  createVNode("span", { class: "text-xs text-slate-300" }, [
                                    createTextVNode(toDisplayString(p.label) + " ", 1),
                                    createVNode("span", { class: "text-xs text-slate-400" }, "(" + toDisplayString(p.value) + ")", 1)
                                  ])
                                ]);
                              }), 128))
                            ])
                          ]),
                          createVNode("p", { class: "text-xs text-slate-400 mb-4" }, "High-priority items needing focus"),
                          createVNode("div", { style: { "position": "relative", "height": "260px" } }, [
                            createVNode("div", { id: "priorityChart" })
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-blue-200 dark:border-slate-600" }, [
                        createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-2xl font-bold text-slate-900 dark:text-white" }, toDisplayString(__props.totalTasks), 1),
                            createVNode("p", { class: "text-xs text-slate-600 dark:text-slate-400 mt-1" }, "Total Tasks Tracked")
                          ]),
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, toDisplayString(__props.completedTasks), 1),
                            createVNode("p", { class: "text-xs text-slate-600 dark:text-slate-400 mt-1" }, "Tasks Completed")
                          ]),
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-2xl font-bold text-red-600 dark:text-red-400" }, toDisplayString(__props.overdueTasks), 1),
                            createVNode("p", { class: "text-xs text-slate-600 dark:text-slate-400 mt-1" }, "Overdue Tasks")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-span-12 lg:col-span-4 flex flex-col gap-6" }, [
                      createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("h3", { class: "text-lg font-bold text-slate-900 dark:text-white" }, "🏁 Project Completion"),
                          createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400" }, "Completion rate per project (click to open)")
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4" }, [
                          (__props.projectsCompletion || []).length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "col-span-full text-slate-400 text-sm italic p-4"
                          }, "No project completion data available.")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.projectsCompletion, (proj) => {
                            return openBlock(), createBlock("div", {
                              key: proj.id,
                              class: "rounded-2xl p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
                            }, [
                              createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode(unref(Link), {
                                    href: `/projects/${proj.id}`,
                                    class: "font-semibold text-slate-900 dark:text-white truncate hover:underline"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(proj.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400 mt-1" }, toDisplayString(proj.completed_tasks) + " completed • " + toDisplayString(proj.total_tasks) + " total", 1)
                                ]),
                                createVNode("div", { class: "flex flex-col items-end" }, [
                                  createVNode("div", {
                                    class: ["px-2 py-1 rounded-full text-xs font-bold", proj.completion_rate >= 75 ? "bg-green-100 text-green-700" : proj.completion_rate >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"]
                                  }, toDisplayString(proj.completion_rate) + "% ", 3)
                                ])
                              ]),
                              createVNode("div", { class: "w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-3 overflow-hidden" }, [
                                createVNode("div", {
                                  class: ["h-2.5 rounded-full transition-all", proj.completion_rate >= 75 ? "bg-green-500" : proj.completion_rate >= 50 ? "bg-amber-500" : "bg-red-500"],
                                  style: { width: (proj.completion_rate || 0) + "%" }
                                }, null, 6)
                              ])
                            ]);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700 h-fit" }, [
                        createVNode("h3", { class: "text-lg font-bold text-slate-900 dark:text-white mb-6" }, "👥 Team Workload Overview"),
                        createVNode("div", { class: "space-y-6" }, [
                          (__props.teamMembers || []).length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-slate-400 text-sm italic text-center py-8"
                          }, "No team data found.")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(sortedTeamMembers.value, (member) => {
                            return openBlock(), createBlock("div", {
                              key: member.id,
                              class: "pb-6 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0"
                            }, [
                              createVNode("div", { class: "flex justify-between items-center mb-3" }, [
                                createVNode("div", { class: "flex items-center gap-3 flex-grow min-w-0" }, [
                                  createVNode("div", { class: "w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0" }, toDisplayString((member.name || "U").charAt(0).toUpperCase()), 1),
                                  createVNode("div", { class: "min-w-0 flex-grow" }, [
                                    createVNode("p", { class: "font-semibold text-slate-900 dark:text-white truncate" }, toDisplayString(member.name), 1),
                                    createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400" }, toDisplayString(member.task_count || 0) + " tasks", 1)
                                  ])
                                ]),
                                createVNode("div", { class: "flex flex-col items-end gap-1 ml-2" }, [
                                  createVNode("span", {
                                    class: ["text-lg font-bold", getLoadColorClass(member.workload || 0)]
                                  }, toDisplayString(Math.round(member.workload || 0)) + "% ", 3),
                                  (member.workload || 0) >= 90 ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded whitespace-nowrap"
                                  }, "🚨 Overloaded")) : (member.workload || 0) >= 75 ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded whitespace-nowrap"
                                  }, "⚠️ High Load")) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden" }, [
                                createVNode("div", {
                                  class: ["h-2.5 rounded-full transition-all", getWorkloadBarClass(member.workload || 0)],
                                  style: { width: Math.min(100, member.workload || 0) + "%" }
                                }, null, 6)
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-700" }, [
                    createVNode("div", { class: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6" }, [
                      createVNode("h3", { class: "text-lg font-bold text-slate-900 dark:text-white" }, "📝 Recent Activity (Last 7 Days)"),
                      createVNode("div", { class: "relative w-full md:w-64" }, [
                        createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-gray-400",
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => taskSearchTerm.value = $event,
                          type: "text",
                          placeholder: "Search task...",
                          class: "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, taskSearchTerm.value]
                        ])
                      ])
                    ]),
                    __props.recentActivity.data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-slate-400 text-sm italic text-center py-8"
                    }, "No activities found with current filters.")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "divide-y divide-slate-200 dark:divide-slate-700"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentActivity.data, (task) => {
                        return openBlock(), createBlock("div", {
                          key: task.id,
                          class: "py-4 first:pt-0 last:pb-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 px-4 -mx-4 rounded transition-colors"
                        }, [
                          createVNode("div", { class: "flex justify-between items-start gap-4" }, [
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("p", { class: "font-semibold text-slate-900 dark:text-white truncate" }, toDisplayString(task.title), 1),
                              createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-400 mt-1" }, [
                                createVNode("span", { class: "font-medium" }, "Project:"),
                                createTextVNode(" " + toDisplayString(task.project?.name || "Unassigned") + " ", 1),
                                createVNode("span", { class: "mx-2" }, "•"),
                                createVNode("span", { class: "font-medium" }, "Assigned:"),
                                createTextVNode(" " + toDisplayString(task.assignee?.name || "Unassigned"), 1)
                              ]),
                              createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-500 mt-2" }, "Updated: " + toDisplayString(new Date(task.updated_at).toLocaleDateString()), 1)
                            ]),
                            createVNode("span", {
                              class: ["px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap", {
                                "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200": task.status === "not_started",
                                "bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-300": task.status === "in_progress",
                                "bg-orange-200 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300": task.status === "blocked",
                                "bg-green-500 text-white dark:bg-green-600": task.status === "completed"
                              }]
                            }, toDisplayString(task.status.replace("_", " ").toUpperCase()), 3)
                          ])
                        ]);
                      }), 128))
                    ])),
                    __props.recentActivity.links.length > 3 ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4"
                    }, [
                      createVNode("div", { class: "flex-1 flex justify-between sm:hidden" }, [
                        __props.recentActivity.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: __props.recentActivity.prev_page_url,
                          class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        __props.recentActivity.next_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: __props.recentActivity.next_page_url,
                          class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-700 dark:text-gray-300" }, [
                            createTextVNode(" Showing "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.recentActivity.from), 1),
                            createTextVNode(" to "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.recentActivity.to), 1),
                            createTextVNode(" of "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.recentActivity.total), 1),
                            createTextVNode(" results ")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("nav", {
                            class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                            "aria-label": "Pagination"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.recentActivity.links, (link, key) => {
                              return openBlock(), createBlock(Fragment, { key }, [
                                link.url === null ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: ["relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-400 dark:text-gray-500 rounded-l-md", { "rounded-l-md": key === 0, "rounded-r-md": key === __props.recentActivity.links.length - 1 }],
                                  innerHTML: link.label
                                }, null, 10, ["innerHTML"])) : (openBlock(), createBlock(unref(Link), {
                                  key: 1,
                                  href: link.url,
                                  class: ["relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors", [
                                    link.active ? "z-10 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
                                    key === 0 ? "rounded-l-md" : "",
                                    key === __props.recentActivity.links.length - 1 ? "rounded-r-md" : ""
                                  ]],
                                  innerHTML: link.label
                                }, null, 8, ["href", "class", "innerHTML"]))
                              ], 64);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-700 mt-8" }, [
                    createVNode("h3", { class: "text-lg font-bold text-slate-900 dark:text-white mb-6" }, "🚨 Tasks at Risk (Overdue)"),
                    createVNode("div", { class: "divide-y divide-slate-200 dark:divide-slate-700" }, [
                      !__props.recentActivity || __props.recentActivity.data.filter((t) => t.status !== "completed" && new Date(t.due_date) < /* @__PURE__ */ new Date()).length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-slate-400 text-sm italic p-4 text-center"
                      }, "No overdue tasks found.")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentActivity.data.filter((task) => task.status !== "completed" && task.due_date && new Date(task.due_date) < /* @__PURE__ */ new Date()).slice(0, 10), (t) => {
                        return openBlock(), createBlock("div", {
                          key: t.id,
                          class: "p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        }, [
                          createVNode("div", { class: "font-semibold text-slate-900 dark:text-white" }, toDisplayString(t.title), 1),
                          createVNode("div", { class: "text-sm text-slate-600 dark:text-slate-400 mt-1" }, "Assigned: " + toDisplayString(t.assignee?.name || "Unassigned"), 1),
                          createVNode("div", { class: "text-xs text-red-600 dark:text-red-400 mt-2" }, "Due: " + toDisplayString(new Date(t.due_date).toLocaleDateString()), 1)
                        ]);
                      }), 128))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Reports/Analytics.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
