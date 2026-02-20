import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = {
  __name: "EmployeeWorkloadRow",
  __ssrInlineRender: true,
  props: {
    employee: Object
  },
  setup(__props) {
    const props = __props;
    const borderColorClass = computed(() => {
      const level = props.employee.bottleneck_level;
      const classes = {
        healthy: "border-green-500 bg-green-50",
        moderate: "border-yellow-500 bg-yellow-50",
        critical: "border-red-500 bg-red-50"
      };
      return classes[level] || classes.healthy;
    });
    const workloadColorClass = computed(() => {
      const percentage = props.employee.workload_percentage;
      if (percentage < 50) return "text-green-600";
      if (percentage < 80) return "text-yellow-600";
      return "text-red-600";
    });
    const workloadBarColorClass = computed(() => {
      const percentage = props.employee.workload_percentage;
      if (percentage < 50) return "bg-green-500";
      if (percentage < 80) return "bg-yellow-500";
      return "bg-red-500";
    });
    const statusColorClass = computed(() => {
      const level = props.employee.bottleneck_level;
      const classes = {
        healthy: "text-green-600",
        moderate: "text-yellow-600",
        critical: "text-red-600"
      };
      return classes[level] || classes.healthy;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["p-6 bg-gray-50 rounded-lg border-l-4 transition hover:shadow-md", borderColorClass.value]
      }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><h4 class="font-semibold text-gray-900">${ssrInterpolate(__props.employee.name)}</h4><p class="text-sm text-gray-600">${ssrInterpolate(__props.employee.email)}</p><p class="text-xs text-gray-500 mt-1">Role: ${ssrInterpolate(__props.employee.role)}</p></div><div class="grid grid-cols-2 gap-4"><div><p class="text-xs text-gray-600">Active Tasks</p><p class="text-2xl font-bold text-blue-600">${ssrInterpolate(__props.employee.active_tasks)}</p></div><div><p class="text-xs text-gray-600">Overdue</p><p class="${ssrRenderClass([__props.employee.overdue_tasks > 0 ? "text-red-600" : "text-green-600", "text-2xl font-bold"])}">${ssrInterpolate(__props.employee.overdue_tasks)}</p></div><div><p class="text-xs text-gray-600">In Progress</p><p class="text-2xl font-bold text-yellow-600">${ssrInterpolate(__props.employee.in_progress)}</p></div><div><p class="text-xs text-gray-600">Completed</p><p class="text-2xl font-bold text-green-600">${ssrInterpolate(__props.employee.completed_tasks)}</p></div></div><div><div class="flex justify-between items-center mb-2"><p class="text-xs font-medium text-gray-700">Workload</p><p class="${ssrRenderClass([workloadColorClass.value, "text-sm font-bold"])}">${ssrInterpolate(__props.employee.workload_percentage)}% </p></div><div class="bg-gray-200 rounded-full h-3 overflow-hidden"><div class="${ssrRenderClass([workloadBarColorClass.value, "h-full rounded-full transition-all duration-300"])}" style="${ssrRenderStyle({ width: `${__props.employee.workload_percentage}%` })}"></div></div><p class="text-xs text-gray-600 mt-2"> Status: <span class="${ssrRenderClass([statusColorClass.value, "font-semibold"])}">${ssrInterpolate(__props.employee.bottleneck_level)}</span></p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/EmployeeWorkloadRow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
