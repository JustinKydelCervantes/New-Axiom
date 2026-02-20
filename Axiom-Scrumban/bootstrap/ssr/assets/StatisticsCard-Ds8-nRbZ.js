import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "StatisticsCard",
  __ssrInlineRender: true,
  props: {
    title: String,
    value: [String, Number],
    subtitle: String,
    icon: String,
    color: {
      type: String,
      default: "blue"
    }
  },
  setup(__props) {
    const props = __props;
    const colorClasses = computed(() => {
      const colors = {
        blue: "from-blue-50 to-blue-100 text-blue-900 border-l-4 border-blue-500",
        yellow: "from-yellow-50 to-yellow-100 text-yellow-900 border-l-4 border-yellow-500",
        red: "from-red-50 to-red-100 text-red-900 border-l-4 border-red-500",
        green: "from-green-50 to-green-100 text-green-900 border-l-4 border-green-500"
      };
      return colors[props.color] || colors.blue;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["p-6 bg-gradient-to-br rounded-lg shadow", colorClasses.value]
      }, _attrs))}><div class="flex justify-between items-start"><div><p class="text-sm font-medium opacity-75">${ssrInterpolate(__props.title)}</p><p class="text-3xl font-bold mt-2">${ssrInterpolate(__props.value)}</p><p class="text-xs opacity-75 mt-2">${ssrInterpolate(__props.subtitle)}</p></div><div class="text-4xl">${ssrInterpolate(__props.icon)}</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/StatisticsCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
