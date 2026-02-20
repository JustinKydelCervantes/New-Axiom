import { resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Link = resolveComponent("Link");
  const _component_AxiomLogo = resolveComponent("AxiomLogo");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden" }, _attrs))}><div class="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div><div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>`);
  _push(ssrRenderComponent(_component_Link, {
    href: "/",
    class: "mb-8 flex items-center space-x-2 group relative z-10"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_AxiomLogo, {
          size: "lg",
          class: "group-hover:drop-shadow-xl transition-all"
        }, null, _parent2, _scopeId));
        _push2(`<span class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"${_scopeId}>Axiom</span>`);
      } else {
        return [
          createVNode(_component_AxiomLogo, {
            size: "lg",
            class: "group-hover:drop-shadow-xl transition-all"
          }),
          createVNode("span", { class: "text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400" }, "Axiom")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="w-full max-w-md relative z-10"><div class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-8 py-8 shadow-2xl">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div><div class="mt-8 text-center text-gray-400 text-sm relative z-10">`);
  _push(ssrRenderComponent(_component_Link, {
    href: "/",
    class: "text-cyan-400 hover:text-cyan-300 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Back to home`);
      } else {
        return [
          createTextVNode("Back to home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GuestLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  GuestLayout as G
};
