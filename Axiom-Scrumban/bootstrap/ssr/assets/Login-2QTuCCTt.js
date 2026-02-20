import { withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass } from "vue/server-renderer";
import { G as GuestLayout } from "./GuestLayout-C66aqGKI.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputLabel-DFrcifip.js";
import "./PrimaryButton-Cygj-hvK.js";
import "./TextInput-CIZgVg5y.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-8"${_scopeId}><h1 class="text-4xl font-black text-white mb-3 tracking-tight"${_scopeId}>Welcome Back</h1><p class="text-gray-400 text-lg"${_scopeId}>Sign in to your account to get started</p></div>`);
            if (__props.status) {
              _push2(`<div class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium animate-pulse"${_scopeId}> ✓ ${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-6"${_scopeId}><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "email",
              value: "Email Address",
              class: "text-white/90 font-semibold text-sm"
            }, null, _parent2, _scopeId));
            _push2(`<input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} required autofocus autocomplete="username" placeholder="you@example.com" class="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2 text-red-400 text-sm",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "password",
              value: "Password",
              class: "text-white/90 font-semibold text-sm"
            }, null, _parent2, _scopeId));
            _push2(`<input id="password" type="password"${ssrRenderAttr("value", unref(form).password)} required autocomplete="current-password" placeholder="••••••••" class="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2 text-red-400 text-sm",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between pt-2"${_scopeId}><label class="flex items-center space-x-3 cursor-pointer group"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""} class="w-5 h-5 bg-white/5 border border-white/20 rounded-lg text-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer group-hover:border-white/30 transition-all"${_scopeId}><span class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors"${_scopeId}>Remember me</span></label>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot password? `);
                  } else {
                    return [
                      createTextVNode(" Forgot password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-60 cursor-not-allowed scale-98": unref(form).processing }, "w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black rounded-xl hover:shadow-2xl hover:shadow-purple-600/40 transition-all duration-300 disabled:cursor-not-allowed mt-8 text-lg relative overflow-hidden group"])}"${_scopeId}><span class="relative z-10 flex items-center justify-center"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Signing in..." : "Sign In")} `);
            if (!unref(form).processing) {
              _push2(`<svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span></button></form><div class="mt-8 text-center border-t border-white/10 pt-6"${_scopeId}><p class="text-gray-400 text-sm"${_scopeId}> Don&#39;t have an account? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/register",
              class: "text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create one now `);
                } else {
                  return [
                    createTextVNode(" Create one now ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              createVNode("div", { class: "mb-8" }, [
                createVNode("h1", { class: "text-4xl font-black text-white mb-3 tracking-tight" }, "Welcome Back"),
                createVNode("p", { class: "text-gray-400 text-lg" }, "Sign in to your account to get started")
              ]),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium animate-pulse"
              }, " ✓ " + toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-6"
              }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "email",
                    value: "Email Address",
                    class: "text-white/90 font-semibold text-sm"
                  }),
                  withDirectives(createVNode("input", {
                    id: "email",
                    type: "email",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username",
                    placeholder: "you@example.com",
                    class: "w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  createVNode(_sfc_main$2, {
                    class: "mt-2 text-red-400 text-sm",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "password",
                    value: "Password",
                    class: "text-white/90 font-semibold text-sm"
                  }),
                  withDirectives(createVNode("input", {
                    id: "password",
                    type: "password",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password",
                    placeholder: "••••••••",
                    class: "w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password]
                  ]),
                  createVNode(_sfc_main$2, {
                    class: "mt-2 text-red-400 text-sm",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "flex items-center justify-between pt-2" }, [
                  createVNode("label", { class: "flex items-center space-x-3 cursor-pointer group" }, [
                    withDirectives(createVNode("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                      class: "w-5 h-5 bg-white/5 border border-white/20 rounded-lg text-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer group-hover:border-white/30 transition-all"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, unref(form).remember]
                    ]),
                    createVNode("span", { class: "text-sm text-gray-400 group-hover:text-gray-300 transition-colors" }, "Remember me")
                  ]),
                  __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("password.request"),
                    class: "text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Forgot password? ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("button", {
                  onClick: withModifiers(submit, ["prevent"]),
                  disabled: unref(form).processing,
                  class: [{ "opacity-60 cursor-not-allowed scale-98": unref(form).processing }, "w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black rounded-xl hover:shadow-2xl hover:shadow-purple-600/40 transition-all duration-300 disabled:cursor-not-allowed mt-8 text-lg relative overflow-hidden group"]
                }, [
                  createVNode("span", { class: "relative z-10 flex items-center justify-center" }, [
                    createTextVNode(toDisplayString(unref(form).processing ? "Signing in..." : "Sign In") + " ", 1),
                    !unref(form).processing ? (openBlock(), createBlock("svg", {
                      key: 0,
                      class: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M13 7l5 5m0 0l-5 5m5-5H6"
                      })
                    ])) : createCommentVNode("", true)
                  ])
                ], 10, ["disabled"])
              ], 32),
              createVNode("div", { class: "mt-8 text-center border-t border-white/10 pt-6" }, [
                createVNode("p", { class: "text-gray-400 text-sm" }, [
                  createTextVNode(" Don't have an account? "),
                  createVNode(unref(Link), {
                    href: "/register",
                    class: "text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Create one now ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
