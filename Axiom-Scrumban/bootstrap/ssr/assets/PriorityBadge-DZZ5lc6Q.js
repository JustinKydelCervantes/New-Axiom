import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "PriorityBadge",
  __ssrInlineRender: true,
  props: {
    priority: String
  },
  setup(__props) {
    const props = __props;
    const priorityClass = computed(() => {
      const classes = {
        high: "bg-red-200 text-red-800",
        medium: "bg-yellow-200 text-yellow-800",
        low: "bg-green-200 text-green-800"
      };
      return classes[props.priority] || classes.medium;
    });
    const priorityLabel = computed(() => {
      return props.priority?.charAt(0).toUpperCase() + props.priority?.slice(1) || "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["px-3 py-1 rounded-full text-xs font-semibold", priorityClass.value]
      }, _attrs))}>${ssrInterpolate(priorityLabel.value)}</span>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/PriorityBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
