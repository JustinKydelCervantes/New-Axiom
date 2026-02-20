import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "ProgressBar",
  __ssrInlineRender: true,
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="bg-gray-200 rounded-full h-2 overflow-hidden"><div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${__props.percentage}%` })}"></div></div><p class="text-xs text-gray-600 mt-1">${ssrInterpolate(__props.percentage)}%</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/ProgressBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
