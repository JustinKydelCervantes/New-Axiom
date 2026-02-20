import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "FilterPanel",
  __ssrInlineRender: true,
  props: {
    filterOptions: Object,
    initialFilters: Object
  },
  emits: ["apply-filters"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const localFilters = ref({
      status: props.initialFilters?.status || [],
      priority: props.initialFilters?.priority || [],
      assigned_to: props.initialFilters?.assigned_to || "",
      overdue_only: props.initialFilters?.overdue_only || false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white shadow-sm rounded-lg p-6" }, _attrs))}><h3 class="text-lg font-semibold text-gray-900 mb-4">Filter Tasks</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Status</label><select multiple class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"><!--[-->`);
      ssrRenderList(__props.filterOptions.statuses, (status) => {
        _push(`<option${ssrRenderAttr("value", status)}${ssrIncludeBooleanAttr(Array.isArray(localFilters.value.status) ? ssrLooseContain(localFilters.value.status, status) : ssrLooseEqual(localFilters.value.status, status)) ? " selected" : ""}>${ssrInterpolate(status.replace("_", " "))}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Priority</label><select multiple class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"><!--[-->`);
      ssrRenderList(__props.filterOptions.priorities, (priority) => {
        _push(`<option${ssrRenderAttr("value", priority)}${ssrIncludeBooleanAttr(Array.isArray(localFilters.value.priority) ? ssrLooseContain(localFilters.value.priority, priority) : ssrLooseEqual(localFilters.value.priority, priority)) ? " selected" : ""}>${ssrInterpolate(priority)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Assignee</label><select class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(localFilters.value.assigned_to) ? ssrLooseContain(localFilters.value.assigned_to, "") : ssrLooseEqual(localFilters.value.assigned_to, "")) ? " selected" : ""}>All Employees</option><!--[-->`);
      ssrRenderList(__props.filterOptions.employees, (employee) => {
        _push(`<option${ssrRenderAttr("value", employee.id)}${ssrIncludeBooleanAttr(Array.isArray(localFilters.value.assigned_to) ? ssrLooseContain(localFilters.value.assigned_to, employee.id) : ssrLooseEqual(localFilters.value.assigned_to, employee.id)) ? " selected" : ""}>${ssrInterpolate(employee.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Filter</label><label class="flex items-center p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input${ssrIncludeBooleanAttr(Array.isArray(localFilters.value.overdue_only) ? ssrLooseContain(localFilters.value.overdue_only, null) : localFilters.value.overdue_only) ? " checked" : ""} type="checkbox" class="rounded"><span class="ml-2 text-sm text-gray-700">Overdue Only</span></label></div></div><div class="mt-4 flex gap-2"><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"> Apply Filters </button><button class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"> Reset </button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/FilterPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
