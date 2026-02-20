import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./PriorityBadge-DZZ5lc6Q.js";
import _sfc_main$2 from "./ProgressBar-B9HS8ur5.js";
const _sfc_main = {
  __name: "UpcomingTasksList",
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}>`);
      if (__props.tasks.length === 0) {
        _push(`<div class="text-center py-8 text-gray-500"><p>No upcoming tasks</p></div>`);
      } else {
        _push(`<div><!--[-->`);
        ssrRenderList(__props.tasks.slice(0, 5), (task) => {
          _push(`<div class="p-4 border-l-4 border-blue-400 bg-blue-50 rounded hover:shadow-md transition"><div class="flex justify-between items-start gap-4"><div class="flex-1"><h4 class="font-semibold text-gray-900">${ssrInterpolate(task.title)}</h4><p class="text-sm text-gray-600 mt-1">${ssrInterpolate(task.project_name)} • ${ssrInterpolate(task.assignee_name)}</p><p class="text-xs text-gray-500 mt-2"> Due: <span class="font-medium">${ssrInterpolate(formatDate(task.due_date))}</span></p></div><div class="text-right">`);
          _push(ssrRenderComponent(_sfc_main$1, {
            priority: task.priority
          }, null, _parent));
          _push(`<div class="w-16 mt-2">`);
          _push(ssrRenderComponent(_sfc_main$2, {
            percentage: task.progress_percent
          }, null, _parent));
          _push(`</div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/UpcomingTasksList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
