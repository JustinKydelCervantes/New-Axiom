import { ref, computed, onMounted, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, withDirectives, Fragment, renderList, vModelSelect, vModelText, vModelCheckbox, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Gantt",
  __ssrInlineRender: true,
  props: {
    project: Object,
    tasks: Array,
    statistics: Object,
    dateRange: Object,
    teams: Array
  },
  setup(__props) {
    const props = __props;
    const isDark = ref(false);
    const viewMode = ref("Week");
    const timelineHeader = ref(null);
    const showFilters = ref(false);
    const filters = ref({
      user_id: null,
      status: [],
      priority: null,
      date_from: null,
      date_to: null,
      overdue_only: false,
      incomplete_only: false
    });
    const statusOptions = [
      { value: "not_started", label: "Not Started" },
      { value: "in_progress", label: "In Progress" },
      { value: "completed", label: "Completed" },
      { value: "blocked", label: "Blocked" }
    ];
    const priorityOptions = [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "urgent", label: "Urgent" }
    ];
    const filteredTasks = computed(() => {
      return props.tasks.filter((task) => {
        if (filters.value.user_id && task.assigned_to?.id !== filters.value.user_id) return false;
        if (filters.value.status.length > 0 && !filters.value.status.includes(task.status)) return false;
        if (filters.value.priority && task.priority !== filters.value.priority) return false;
        if (filters.value.date_from && task.start_date && task.start_date < filters.value.date_from) return false;
        if (filters.value.date_to && task.due_date && task.due_date > filters.value.date_to) return false;
        if (filters.value.overdue_only && !task.is_overdue) return false;
        if (filters.value.incomplete_only && task.status === "completed") return false;
        return true;
      });
    });
    const toggleStatus = (status) => {
      const index = filters.value.status.indexOf(status);
      if (index > -1) {
        filters.value.status.splice(index, 1);
      } else {
        filters.value.status.push(status);
      }
    };
    const clearFilters = () => {
      filters.value = {
        user_id: null,
        status: [],
        priority: null,
        date_from: null,
        date_to: null,
        overdue_only: false,
        incomplete_only: false
      };
    };
    const timelineStart = computed(() => {
      if (!props.dateRange?.min_date) return /* @__PURE__ */ new Date();
      return new Date(props.dateRange.min_date);
    });
    const timelineEnd = computed(() => {
      if (!props.dateRange?.max_date) return /* @__PURE__ */ new Date();
      return new Date(props.dateRange.max_date);
    });
    const columnWidth = computed(() => {
      switch (viewMode.value) {
        case "Day":
          return 60;
        case "Week":
          return 40;
        case "Month":
          return 20;
        default:
          return 40;
      }
    });
    const timelineDates = computed(() => {
      const dates = [];
      let curr = new Date(timelineStart.value);
      const end = timelineEnd.value;
      while (curr <= end) {
        dates.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
      }
      return dates;
    });
    const timelineWidth = computed(() => {
      return timelineDates.value.length * columnWidth.value;
    });
    const today = /* @__PURE__ */ new Date();
    const currentDayOffset = computed(() => {
      const diffTime = today.getTime() - timelineStart.value.getTime();
      const diffDays = diffTime / (1e3 * 60 * 60 * 24);
      return Math.max(0, diffDays * columnWidth.value + columnWidth.value / 2);
    });
    const totalProgress = computed(() => {
      if (!props.tasks || props.tasks.length === 0) return 0;
      const total = props.tasks.reduce((acc, t) => acc + (t.progress_percent || 0), 0);
      return Math.round(total / props.tasks.length);
    });
    const getTaskStyle = (task) => {
      const start = new Date(task.start_date);
      const end = new Date(task.due_date);
      const diffStart = (start - timelineStart.value) / (1e3 * 60 * 60 * 24);
      const duration = Math.max((end - start) / (1e3 * 60 * 60 * 24), 1);
      return {
        left: Math.max(0, diffStart * columnWidth.value) + "px",
        width: Math.max(40, duration * columnWidth.value) + "px"
      };
    };
    const getTaskGradient = (status) => {
      const styles = {
        "completed": "bg-gradient-to-r from-emerald-500 to-teal-500",
        "in_progress": "bg-gradient-to-r from-blue-500 to-cyan-500",
        "blocked": "bg-gradient-to-r from-red-500 to-rose-500",
        "not_started": "bg-gradient-to-r from-slate-400 to-slate-500"
      };
      return styles[status] || styles["not_started"];
    };
    const getStatusColor = (status) => {
      const colors = {
        "completed": "bg-emerald-400",
        "in_progress": "bg-blue-400",
        "blocked": "bg-red-400",
        "not_started": "bg-slate-300 dark:bg-slate-600"
      };
      return colors[status] || "bg-slate-300";
    };
    const isWeekend = (date) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    };
    const getDayName = (date) => {
      return date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };
    const syncScroll = (e) => {
      if (timelineHeader.value) {
        timelineHeader.value.scrollLeft = e.target.scrollLeft;
      }
    };
    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
      applyTheme(isDark.value);
    };
    const applyTheme = (isDarkMode) => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };
    onMounted(() => {
      const savedTheme = localStorage.getItem("theme");
      const isDarkMode = document.documentElement.classList.contains("dark");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      let shouldBeDark = false;
      if (savedTheme === "dark") {
        shouldBeDark = true;
      } else if (savedTheme === "light") {
        shouldBeDark = false;
      } else if (isDarkMode) {
        shouldBeDark = true;
      } else if (prefersDark) {
        shouldBeDark = true;
      }
      isDark.value = shouldBeDark;
      applyTheme(shouldBeDark);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: "Gantt: " + __props.project.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100" data-v-8176648b${_scopeId}><nav class="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md z-20" data-v-8176648b${_scopeId}><div class="flex items-center gap-3" data-v-8176648b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("projects.show", __props.project.id),
              class: "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`← Back`);
                } else {
                  return [
                    createTextVNode("← Back")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="font-bold text-xl tracking-tight" data-v-8176648b${_scopeId}>${ssrInterpolate(__props.project.name)} Gantt Chart</h1></div><div class="flex items-center gap-4" data-v-8176648b${_scopeId}><button class="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium transition-colors flex items-center gap-2" data-v-8176648b${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8176648b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" data-v-8176648b${_scopeId}></path></svg> Filters </button><div class="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700" data-v-8176648b${_scopeId}><button class="${ssrRenderClass([viewMode.value === "Day" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-500", "px-3 py-1.5 rounded-md text-sm transition-all"])}" data-v-8176648b${_scopeId}>Day</button><button class="${ssrRenderClass([viewMode.value === "Week" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-500", "px-3 py-1.5 rounded-md text-sm transition-all"])}" data-v-8176648b${_scopeId}>Week</button><button class="${ssrRenderClass([viewMode.value === "Month" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-500", "px-3 py-1.5 rounded-md text-sm transition-all"])}" data-v-8176648b${_scopeId}>Month</button></div><button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" data-v-8176648b${_scopeId}>`);
            if (isDark.value) {
              _push2(`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" data-v-8176648b${_scopeId}><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" data-v-8176648b${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" data-v-8176648b${_scopeId}><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7 11a1 1 0 100-2H6a1 1 0 100 2h1zm-4.536-.464a1 1 0 011.414 0l.707.707A1 1 0 014.172 13.9l-.707-.707a1 1 0 010-1.414zM14 6.464l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414zM6 6a1 1 0 100-2H5a1 1 0 000 2h1z" clip-rule="evenodd" data-v-8176648b${_scopeId}></path></svg>`);
            }
            _push2(`</button></div></nav>`);
            if (showFilters.value) {
              _push2(`<div class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 z-15 shadow-md" data-v-8176648b${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4" data-v-8176648b${_scopeId}><div data-v-8176648b${_scopeId}><label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase" data-v-8176648b${_scopeId}>Assigned To</label><select class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white text-sm" data-v-8176648b${_scopeId}><option${ssrRenderAttr("value", null)} data-v-8176648b${ssrIncludeBooleanAttr(Array.isArray(filters.value.user_id) ? ssrLooseContain(filters.value.user_id, null) : ssrLooseEqual(filters.value.user_id, null)) ? " selected" : ""}${_scopeId}>All Members</option><!--[-->`);
              ssrRenderList(__props.teams, (team) => {
                _push2(`<option${ssrRenderAttr("value", team.id)} data-v-8176648b${ssrIncludeBooleanAttr(Array.isArray(filters.value.user_id) ? ssrLooseContain(filters.value.user_id, team.id) : ssrLooseEqual(filters.value.user_id, team.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(team.name)}</option>`);
              });
              _push2(`<!--]--></select></div><div data-v-8176648b${_scopeId}><label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase" data-v-8176648b${_scopeId}>Priority</label><select class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white text-sm" data-v-8176648b${_scopeId}><option${ssrRenderAttr("value", null)} data-v-8176648b${ssrIncludeBooleanAttr(Array.isArray(filters.value.priority) ? ssrLooseContain(filters.value.priority, null) : ssrLooseEqual(filters.value.priority, null)) ? " selected" : ""}${_scopeId}>All Priorities</option><!--[-->`);
              ssrRenderList(priorityOptions, (p) => {
                _push2(`<option${ssrRenderAttr("value", p.value)} data-v-8176648b${ssrIncludeBooleanAttr(Array.isArray(filters.value.priority) ? ssrLooseContain(filters.value.priority, p.value) : ssrLooseEqual(filters.value.priority, p.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(p.label)}</option>`);
              });
              _push2(`<!--]--></select></div><div data-v-8176648b${_scopeId}><label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase" data-v-8176648b${_scopeId}>From Date</label><input${ssrRenderAttr("value", filters.value.date_from)} type="date" class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white text-sm" data-v-8176648b${_scopeId}></div><div data-v-8176648b${_scopeId}><label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase" data-v-8176648b${_scopeId}>To Date</label><input${ssrRenderAttr("value", filters.value.date_to)} type="date" class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white text-sm" data-v-8176648b${_scopeId}></div><div class="flex items-end" data-v-8176648b${_scopeId}><button class="w-full px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-md hover:shadow-lg" data-v-8176648b${_scopeId}> ✕ Clear All Filters </button></div></div><div class="flex flex-wrap gap-4 items-center" data-v-8176648b${_scopeId}><div class="flex gap-2" data-v-8176648b${_scopeId}><!--[-->`);
              ssrRenderList(statusOptions, (status) => {
                _push2(`<label class="flex items-center gap-2 cursor-pointer" data-v-8176648b${_scopeId}><input type="checkbox"${ssrRenderAttr("value", status.value)}${ssrIncludeBooleanAttr(filters.value.status.includes(status.value)) ? " checked" : ""} class="rounded" data-v-8176648b${_scopeId}><span class="text-sm text-slate-700 dark:text-slate-300" data-v-8176648b${_scopeId}>${ssrInterpolate(status.label)}</span></label>`);
              });
              _push2(`<!--]--></div><div class="flex gap-2 border-l border-slate-300 dark:border-slate-600 pl-4" data-v-8176648b${_scopeId}><label class="flex items-center gap-2 cursor-pointer" data-v-8176648b${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(filters.value.overdue_only) ? ssrLooseContain(filters.value.overdue_only, null) : filters.value.overdue_only) ? " checked" : ""} type="checkbox" class="rounded" data-v-8176648b${_scopeId}><span class="text-sm text-slate-700 dark:text-slate-300" data-v-8176648b${_scopeId}>Overdue Only</span></label><label class="flex items-center gap-2 cursor-pointer" data-v-8176648b${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(filters.value.incomplete_only) ? ssrLooseContain(filters.value.incomplete_only, null) : filters.value.incomplete_only) ? " checked" : ""} type="checkbox" class="rounded" data-v-8176648b${_scopeId}><span class="text-sm text-slate-700 dark:text-slate-300" data-v-8176648b${_scopeId}>Incomplete Only</span></label></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex-1 overflow-hidden flex relative" data-v-8176648b${_scopeId}><div class="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col z-10 shadow-lg" data-v-8176648b${_scopeId}><div class="h-12 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 bg-slate-50/50 dark:bg-slate-800/50" data-v-8176648b${_scopeId}><span class="text-xs font-semibold text-slate-500 uppercase tracking-wider" data-v-8176648b${_scopeId}>Tasks (${ssrInterpolate(filteredTasks.value.length)})</span></div><div class="flex-1 overflow-y-auto p-2 space-y-1" data-v-8176648b${_scopeId}><!--[-->`);
            ssrRenderList(filteredTasks.value, (task) => {
              _push2(`<div class="group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent" data-v-8176648b${_scopeId}><div class="${ssrRenderClass([getStatusColor(task.status), "w-2 h-2 rounded-full"])}" data-v-8176648b${_scopeId}></div><div class="flex-1 min-w-0" data-v-8176648b${_scopeId}><h3 class="text-sm font-medium text-slate-700 dark:text-slate-200 truncate" data-v-8176648b${_scopeId}>${ssrInterpolate(task.title)}</h3><p class="text-xs text-slate-400 truncate" data-v-8176648b${_scopeId}>${ssrInterpolate(formatDate(task.start_date))} - ${ssrInterpolate(formatDate(task.due_date))}</p></div></div>`);
            });
            _push2(`<!--]-->`);
            if (filteredTasks.value.length === 0) {
              _push2(`<div class="p-4 text-center text-slate-400 text-sm" data-v-8176648b${_scopeId}> No tasks match filters </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900" data-v-8176648b${_scopeId}><div class="flex justify-between items-center text-xs text-slate-500 mb-2" data-v-8176648b${_scopeId}><span data-v-8176648b${_scopeId}>Overall Progress</span><span data-v-8176648b${_scopeId}>${ssrInterpolate(totalProgress.value)}%</span></div><div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden" data-v-8176648b${_scopeId}><div class="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 transition-all" style="${ssrRenderStyle({ width: totalProgress.value + "%" })}" data-v-8176648b${_scopeId}></div></div></div></div><div class="flex-1 flex flex-col overflow-hidden relative" data-v-8176648b${_scopeId}><div class="h-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex overflow-hidden select-none" data-v-8176648b${_scopeId}><!--[-->`);
            ssrRenderList(timelineDates.value, (date, index) => {
              _push2(`<div class="flex-shrink-0 border-r border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-xs" style="${ssrRenderStyle({ width: columnWidth.value + "px" })}" data-v-8176648b${_scopeId}><span class="font-medium text-slate-700 dark:text-slate-300" data-v-8176648b${_scopeId}>${ssrInterpolate(getDayName(date))}</span><span class="text-slate-400 text-[11px]" data-v-8176648b${_scopeId}>${ssrInterpolate(date.getDate())}</span></div>`);
            });
            _push2(`<!--]--></div><div class="flex-1 overflow-auto relative" data-v-8176648b${_scopeId}><div class="absolute inset-0 flex pointer-events-none z-0" style="${ssrRenderStyle({ width: timelineWidth.value + "px" })}" data-v-8176648b${_scopeId}><!--[-->`);
            ssrRenderList(timelineDates.value, (date, index) => {
              _push2(`<div class="${ssrRenderClass([isWeekend(date) ? "bg-slate-50/50 dark:bg-slate-800/20" : "", "flex-shrink-0 border-r border-slate-200/40 dark:border-slate-800/40"])}" style="${ssrRenderStyle({ width: columnWidth.value + "px" })}" data-v-8176648b${_scopeId}></div>`);
            });
            _push2(`<!--]--><div class="absolute top-0 h-full w-px bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] z-20" style="${ssrRenderStyle({ left: currentDayOffset.value + "px" })}" data-v-8176648b${_scopeId}><div class="absolute -top-1 -left-1 w-2.5 h-2.5 bg-red-500 rounded-full" data-v-8176648b${_scopeId}></div></div></div><div class="relative z-10 p-2 space-y-1" style="${ssrRenderStyle({ width: timelineWidth.value + "px" })}" data-v-8176648b${_scopeId}><!--[-->`);
            ssrRenderList(filteredTasks.value, (task) => {
              _push2(`<div class="h-16 relative group" data-v-8176648b${_scopeId}>`);
              if (task.start_date && task.due_date) {
                _push2(`<div class="${ssrRenderClass([getTaskGradient(task.status), "absolute h-10 top-3 rounded-md shadow-sm border border-white/10 cursor-pointer transition-all hover:shadow-md hover:scale-105 flex items-center overflow-hidden"])}" style="${ssrRenderStyle(getTaskStyle(task))}"${ssrRenderAttr("title", task.title + " (" + formatDate(task.start_date) + " to " + formatDate(task.due_date) + ") " + task.progress_percent + "%")} data-v-8176648b${_scopeId}><div class="absolute left-0 top-0 bottom-0 bg-black/10 transition-all" style="${ssrRenderStyle({ width: task.progress_percent + "%" })}" data-v-8176648b${_scopeId}></div><div class="relative px-2 flex items-center gap-2 text-white text-xs font-medium w-full min-w-0" data-v-8176648b${_scopeId}><span class="truncate" data-v-8176648b${_scopeId}>${ssrInterpolate(task.title)}</span><span class="opacity-70 ml-auto text-[10px] flex-shrink-0" data-v-8176648b${_scopeId}>${ssrInterpolate(task.progress_percent)}%</span></div></div>`);
              } else {
                _push2(`<div class="absolute inset-0 flex items-center px-2 text-xs text-slate-400" data-v-8176648b${_scopeId}> ⚠️ No dates </div>`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100" }, [
                createVNode("nav", { class: "h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md z-20" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("projects.show", __props.project.id),
                      class: "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-medium"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("← Back")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "font-bold text-xl tracking-tight" }, toDisplayString(__props.project.name) + " Gantt Chart", 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("button", {
                      onClick: ($event) => showFilters.value = !showFilters.value,
                      class: "px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium transition-colors flex items-center gap-2"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        })
                      ])),
                      createTextVNode(" Filters ")
                    ], 8, ["onClick"]),
                    createVNode("div", { class: "hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700" }, [
                      createVNode("button", {
                        onClick: ($event) => viewMode.value = "Day",
                        class: [viewMode.value === "Day" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-500", "px-3 py-1.5 rounded-md text-sm transition-all"]
                      }, "Day", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => viewMode.value = "Week",
                        class: [viewMode.value === "Week" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-500", "px-3 py-1.5 rounded-md text-sm transition-all"]
                      }, "Week", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => viewMode.value = "Month",
                        class: [viewMode.value === "Month" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-500", "px-3 py-1.5 rounded-md text-sm transition-all"]
                      }, "Month", 10, ["onClick"])
                    ]),
                    createVNode("button", {
                      onClick: toggleDarkMode,
                      class: "p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    }, [
                      isDark.value ? (openBlock(), createBlock("svg", {
                        key: 0,
                        class: "w-5 h-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" })
                      ])) : (openBlock(), createBlock("svg", {
                        key: 1,
                        class: "w-5 h-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7 11a1 1 0 100-2H6a1 1 0 100 2h1zm-4.536-.464a1 1 0 011.414 0l.707.707A1 1 0 014.172 13.9l-.707-.707a1 1 0 010-1.414zM14 6.464l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414zM6 6a1 1 0 100-2H5a1 1 0 000 2h1z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])
                  ])
                ]),
                showFilters.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 z-15 shadow-md"
                }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase" }, "Assigned To"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => filters.value.user_id = $event,
                        class: "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                      }, [
                        createVNode("option", { value: null }, "All Members"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.teams, (team) => {
                          return openBlock(), createBlock("option", {
                            key: team.id,
                            value: team.id
                          }, toDisplayString(team.name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, filters.value.user_id]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase" }, "Priority"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => filters.value.priority = $event,
                        class: "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                      }, [
                        createVNode("option", { value: null }, "All Priorities"),
                        (openBlock(), createBlock(Fragment, null, renderList(priorityOptions, (p) => {
                          return createVNode("option", {
                            key: p.value,
                            value: p.value
                          }, toDisplayString(p.label), 9, ["value"]);
                        }), 64))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, filters.value.priority]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase" }, "From Date"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => filters.value.date_from = $event,
                        type: "date",
                        class: "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, filters.value.date_from]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase" }, "To Date"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => filters.value.date_to = $event,
                        type: "date",
                        class: "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, filters.value.date_to]
                      ])
                    ]),
                    createVNode("div", { class: "flex items-end" }, [
                      createVNode("button", {
                        onClick: clearFilters,
                        class: "w-full px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
                      }, " ✕ Clear All Filters ")
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-4 items-center" }, [
                    createVNode("div", { class: "flex gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(statusOptions, (status) => {
                        return createVNode("label", {
                          key: status.value,
                          class: "flex items-center gap-2 cursor-pointer"
                        }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: status.value,
                            checked: filters.value.status.includes(status.value),
                            onChange: ($event) => toggleStatus(status.value),
                            class: "rounded"
                          }, null, 40, ["value", "checked", "onChange"]),
                          createVNode("span", { class: "text-sm text-slate-700 dark:text-slate-300" }, toDisplayString(status.label), 1)
                        ]);
                      }), 64))
                    ]),
                    createVNode("div", { class: "flex gap-2 border-l border-slate-300 dark:border-slate-600 pl-4" }, [
                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => filters.value.overdue_only = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, filters.value.overdue_only]
                        ]),
                        createVNode("span", { class: "text-sm text-slate-700 dark:text-slate-300" }, "Overdue Only")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => filters.value.incomplete_only = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, filters.value.incomplete_only]
                        ]),
                        createVNode("span", { class: "text-sm text-slate-700 dark:text-slate-300" }, "Incomplete Only")
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex-1 overflow-hidden flex relative" }, [
                  createVNode("div", { class: "w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col z-10 shadow-lg" }, [
                    createVNode("div", { class: "h-12 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 bg-slate-50/50 dark:bg-slate-800/50" }, [
                      createVNode("span", { class: "text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "Tasks (" + toDisplayString(filteredTasks.value.length) + ")", 1)
                    ]),
                    createVNode("div", { class: "flex-1 overflow-y-auto p-2 space-y-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredTasks.value, (task) => {
                        return openBlock(), createBlock("div", {
                          key: task.id,
                          class: "group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent"
                        }, [
                          createVNode("div", {
                            class: ["w-2 h-2 rounded-full", getStatusColor(task.status)]
                          }, null, 2),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("h3", { class: "text-sm font-medium text-slate-700 dark:text-slate-200 truncate" }, toDisplayString(task.title), 1),
                            createVNode("p", { class: "text-xs text-slate-400 truncate" }, toDisplayString(formatDate(task.start_date)) + " - " + toDisplayString(formatDate(task.due_date)), 1)
                          ])
                        ]);
                      }), 128)),
                      filteredTasks.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-4 text-center text-slate-400 text-sm"
                      }, " No tasks match filters ")) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900" }, [
                      createVNode("div", { class: "flex justify-between items-center text-xs text-slate-500 mb-2" }, [
                        createVNode("span", null, "Overall Progress"),
                        createVNode("span", null, toDisplayString(totalProgress.value) + "%", 1)
                      ]),
                      createVNode("div", { class: "w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden" }, [
                        createVNode("div", {
                          class: "bg-gradient-to-r from-indigo-500 to-blue-500 h-2 transition-all",
                          style: { width: totalProgress.value + "%" }
                        }, null, 4)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex-1 flex flex-col overflow-hidden relative" }, [
                    createVNode("div", {
                      class: "h-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex overflow-hidden select-none",
                      ref_key: "timelineHeader",
                      ref: timelineHeader
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(timelineDates.value, (date, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "flex-shrink-0 border-r border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-xs",
                          style: { width: columnWidth.value + "px" }
                        }, [
                          createVNode("span", { class: "font-medium text-slate-700 dark:text-slate-300" }, toDisplayString(getDayName(date)), 1),
                          createVNode("span", { class: "text-slate-400 text-[11px]" }, toDisplayString(date.getDate()), 1)
                        ], 4);
                      }), 128))
                    ], 512),
                    createVNode("div", {
                      class: "flex-1 overflow-auto relative",
                      onScroll: syncScroll
                    }, [
                      createVNode("div", {
                        class: "absolute inset-0 flex pointer-events-none z-0",
                        style: { width: timelineWidth.value + "px" }
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(timelineDates.value, (date, index) => {
                          return openBlock(), createBlock("div", {
                            key: "grid-" + index,
                            class: ["flex-shrink-0 border-r border-slate-200/40 dark:border-slate-800/40", isWeekend(date) ? "bg-slate-50/50 dark:bg-slate-800/20" : ""],
                            style: { width: columnWidth.value + "px" }
                          }, null, 6);
                        }), 128)),
                        createVNode("div", {
                          class: "absolute top-0 h-full w-px bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] z-20",
                          style: { left: currentDayOffset.value + "px" }
                        }, [
                          createVNode("div", { class: "absolute -top-1 -left-1 w-2.5 h-2.5 bg-red-500 rounded-full" })
                        ], 4)
                      ], 4),
                      createVNode("div", {
                        class: "relative z-10 p-2 space-y-1",
                        style: { width: timelineWidth.value + "px" }
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredTasks.value, (task) => {
                          return openBlock(), createBlock("div", {
                            key: "bar-" + task.id,
                            class: "h-16 relative group"
                          }, [
                            task.start_date && task.due_date ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: ["absolute h-10 top-3 rounded-md shadow-sm border border-white/10 cursor-pointer transition-all hover:shadow-md hover:scale-105 flex items-center overflow-hidden", getTaskGradient(task.status)],
                              style: getTaskStyle(task),
                              title: task.title + " (" + formatDate(task.start_date) + " to " + formatDate(task.due_date) + ") " + task.progress_percent + "%"
                            }, [
                              createVNode("div", {
                                class: "absolute left-0 top-0 bottom-0 bg-black/10 transition-all",
                                style: { width: task.progress_percent + "%" }
                              }, null, 4),
                              createVNode("div", { class: "relative px-2 flex items-center gap-2 text-white text-xs font-medium w-full min-w-0" }, [
                                createVNode("span", { class: "truncate" }, toDisplayString(task.title), 1),
                                createVNode("span", { class: "opacity-70 ml-auto text-[10px] flex-shrink-0" }, toDisplayString(task.progress_percent) + "%", 1)
                              ])
                            ], 14, ["title"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "absolute inset-0 flex items-center px-2 text-xs text-slate-400"
                            }, " ⚠️ No dates "))
                          ]);
                        }), 128))
                      ], 4)
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Gantt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Gantt = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8176648b"]]);
export {
  Gantt as default
};
