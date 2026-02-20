import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./PriorityBadge-DZZ5lc6Q.js";
const _sfc_main = {
  __name: "CriticalTasksList",
  __ssrInlineRender: true,
  props: {
    tasks: Array
  },
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "No date";
      const date = new Date(dateString);
      const today = /* @__PURE__ */ new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (date.toDateString() === today.toDateString()) return "Today";
      if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };
    const statusClass = (status) => {
      if (!status) return "bg-gray-200 text-gray-800";
      const s = String(status).toLowerCase();
      if (s.includes("done") || s.includes("complete")) return "bg-green-600 text-white";
      if (s.includes("progress") || s.includes("in progress")) return "bg-yellow-400 text-black";
      if (s.includes("blocked")) return "bg-red-600 text-white";
      if (s.includes("todo") || s.includes("to do") || s.includes("open")) return "bg-blue-600 text-white";
      return "bg-gray-200 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}>`);
      if (__props.tasks.length === 0) {
        _push(`<div class="text-center py-8 text-gray-500"><p>No critical tasks at the moment</p></div>`);
      } else {
        _push(`<div><!--[-->`);
        ssrRenderList(__props.tasks.slice(0, 5), (task) => {
          _push(`<div class="p-4 border-l-4 border-red-500 bg-red-50 rounded hover:shadow-md transition"><div class="flex justify-between items-start gap-4"><div class="flex-1"><h4 class="font-semibold text-black">${ssrInterpolate(task.title)}</h4><div class="mt-2"><span class="${ssrRenderClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold", statusClass(task.status)])}">${ssrInterpolate(task.status)}</span></div><p class="text-sm text-black mt-2">${ssrInterpolate(task.project_name)} • Assigned to ${ssrInterpolate(task.assignee_name)}</p><p class="text-xs text-black mt-2"> Due: <span class="font-medium">${ssrInterpolate(formatDate(task.due_date))}</span></p></div><div class="text-right">`);
          _push(ssrRenderComponent(_sfc_main$1, {
            priority: task.priority
          }, null, _parent));
          _push(`<div class="text-sm font-medium mt-2 text-black">${ssrInterpolate(task.progress_percent)}%</div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/CriticalTasksList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
