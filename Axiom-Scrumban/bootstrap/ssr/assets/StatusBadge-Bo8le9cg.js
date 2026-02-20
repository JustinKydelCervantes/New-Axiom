import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "StatusBadge",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const props = __props;
    const statusClass = computed(() => {
      const classes = {
        not_started: "bg-gray-200 text-gray-800",
        in_progress: "bg-blue-200 text-blue-800",
        blocked: "bg-red-200 text-red-800",
        completed: "bg-green-200 text-green-800"
      };
      return classes[props.status] || classes.not_started;
    });
    const statusLabel = computed(() => {
      const labels = {
        not_started: "Not Started",
        in_progress: "In Progress",
        blocked: "Blocked",
        completed: "Completed"
      };
      return labels[props.status] || props.status;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap", statusClass.value]
      }, _attrs))}>${ssrInterpolate(statusLabel.value)}</span>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/StatusBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
