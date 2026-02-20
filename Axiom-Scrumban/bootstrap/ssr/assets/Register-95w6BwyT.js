import { ref, computed, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { G as GuestLayout } from "./GuestLayout-C66aqGKI.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./InputLabel-DFrcifip.js";
import "./PrimaryButton-Cygj-hvK.js";
import "./TextInput-CIZgVg5y.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const passwordStrength = ref(0);
    const getPasswordStrength = (password) => {
      let strength = 0;
      if (!password) return 0;
      if (password.length >= 8) strength++;
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
      if (password.match(/[0-9]/)) strength++;
      if (password.match(/[^a-zA-Z0-9]/)) strength++;
      return strength;
    };
    const passwordStrengthColor = computed(() => {
      const strength = getPasswordStrength(form.password);
      if (strength === 0) return "bg-gray-400";
      if (strength === 1) return "bg-red-500";
      if (strength === 2) return "bg-yellow-500";
      if (strength === 3) return "bg-cyan-500";
      return "bg-emerald-500";
    });
    const passwordStrengthText = computed(() => {
      const strength = getPasswordStrength(form.password);
      if (strength === 0) return "";
      if (strength === 1) return "Weak";
      if (strength === 2) return "Fair";
      if (strength === 3) return "Good";
      return "Strong";
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-8"${_scopeId}><h1 class="text-4xl font-black text-white mb-3 tracking-tight"${_scopeId}>Create Account</h1><p class="text-gray-400 text-lg"${_scopeId}>Join thousands using Axiom for project management</p></div><form class="space-y-6"${_scopeId}><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "name",
              value: "Full Name",
              class: "text-white/90 font-semibold text-sm"
            }, null, _parent2, _scopeId));
            _push2(`<input id="name" type="text"${ssrRenderAttr("value", unref(form).name)} required autofocus autocomplete="name" placeholder="John Doe" class="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2 text-red-400 text-sm",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "email",
              value: "Email Address",
              class: "text-white/90 font-semibold text-sm"
            }, null, _parent2, _scopeId));
            _push2(`<input id="email" type="email"${ssrRenderAttr("value", unref(form).email)} required autocomplete="username" placeholder="you@example.com" class="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"${_scopeId}>`);
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
            _push2(`<input id="password" type="password"${ssrRenderAttr("value", unref(form).password)} required autocomplete="new-password" placeholder="••••••••" class="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"${_scopeId}>`);
            if (unref(form).password) {
              _push2(`<div class="mt-3 space-y-2"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}>Strength</span><span class="${ssrRenderClass([passwordStrengthColor.value === "bg-emerald-500" ? "text-emerald-400" : "text-" + passwordStrengthColor.value.split("-")[1] + "-400", "text-xs font-semibold"])}"${_scopeId}>${ssrInterpolate(passwordStrengthText.value)}</span></div><div class="w-full h-2 bg-white/10 rounded-full overflow-hidden"${_scopeId}><div class="${ssrRenderClass(`h-full ${passwordStrengthColor.value} transition-all duration-300`)}" style="${ssrRenderStyle({ width: passwordStrength.value / 4 * 100 + "%" })}"${_scopeId}></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2 text-red-400 text-sm",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "password_confirmation",
              value: "Confirm Password",
              class: "text-white/90 font-semibold text-sm"
            }, null, _parent2, _scopeId));
            _push2(`<input id="password_confirmation" type="password"${ssrRenderAttr("value", unref(form).password_confirmation)} required autocomplete="new-password" placeholder="••••••••" class="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "mt-2 text-red-400 text-sm",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-60 cursor-not-allowed scale-98": unref(form).processing }, "w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black rounded-xl hover:shadow-2xl hover:shadow-purple-600/40 transition-all duration-300 disabled:cursor-not-allowed mt-8 text-lg relative overflow-hidden group"])}"${_scopeId}><span class="relative z-10 flex items-center justify-center"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Creating account..." : "Create Account")} `);
            if (!unref(form).processing) {
              _push2(`<svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span></button></form><div class="mt-8 text-center border-t border-white/10 pt-6"${_scopeId}><p class="text-gray-400 text-sm"${_scopeId}> Already have an account? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/login",
              class: "text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign in here `);
                } else {
                  return [
                    createTextVNode(" Sign in here ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Register" }),
              createVNode("div", { class: "mb-8" }, [
                createVNode("h1", { class: "text-4xl font-black text-white mb-3 tracking-tight" }, "Create Account"),
                createVNode("p", { class: "text-gray-400 text-lg" }, "Join thousands using Axiom for project management")
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-6"
              }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "name",
                    value: "Full Name",
                    class: "text-white/90 font-semibold text-sm"
                  }),
                  withDirectives(createVNode("input", {
                    id: "name",
                    type: "text",
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "name",
                    placeholder: "John Doe",
                    class: "w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).name]
                  ]),
                  createVNode(_sfc_main$2, {
                    class: "mt-2 text-red-400 text-sm",
                    message: unref(form).errors.name
                  }, null, 8, ["message"])
                ]),
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
                    autocomplete: "new-password",
                    placeholder: "••••••••",
                    onInput: ($event) => passwordStrength.value = getPasswordStrength(unref(form).password),
                    class: "w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"
                  }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                    [vModelText, unref(form).password]
                  ]),
                  unref(form).password ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-3 space-y-2"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("span", { class: "text-xs text-gray-400" }, "Strength"),
                      createVNode("span", {
                        class: ["text-xs font-semibold", passwordStrengthColor.value === "bg-emerald-500" ? "text-emerald-400" : "text-" + passwordStrengthColor.value.split("-")[1] + "-400"]
                      }, toDisplayString(passwordStrengthText.value), 3)
                    ]),
                    createVNode("div", { class: "w-full h-2 bg-white/10 rounded-full overflow-hidden" }, [
                      createVNode("div", {
                        class: `h-full ${passwordStrengthColor.value} transition-all duration-300`,
                        style: { width: passwordStrength.value / 4 * 100 + "%" }
                      }, null, 6)
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode(_sfc_main$2, {
                    class: "mt-2 text-red-400 text-sm",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "password_confirmation",
                    value: "Confirm Password",
                    class: "text-white/90 font-semibold text-sm"
                  }),
                  withDirectives(createVNode("input", {
                    id: "password_confirmation",
                    type: "password",
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password",
                    placeholder: "••••••••",
                    class: "w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 backdrop-blur-sm hover:border-white/20"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password_confirmation]
                  ]),
                  createVNode(_sfc_main$2, {
                    class: "mt-2 text-red-400 text-sm",
                    message: unref(form).errors.password_confirmation
                  }, null, 8, ["message"])
                ]),
                createVNode("button", {
                  onClick: withModifiers(submit, ["prevent"]),
                  disabled: unref(form).processing,
                  class: [{ "opacity-60 cursor-not-allowed scale-98": unref(form).processing }, "w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black rounded-xl hover:shadow-2xl hover:shadow-purple-600/40 transition-all duration-300 disabled:cursor-not-allowed mt-8 text-lg relative overflow-hidden group"]
                }, [
                  createVNode("span", { class: "relative z-10 flex items-center justify-center" }, [
                    createTextVNode(toDisplayString(unref(form).processing ? "Creating account..." : "Create Account") + " ", 1),
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
                  createTextVNode(" Already have an account? "),
                  createVNode(unref(Link), {
                    href: "/login",
                    class: "text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Sign in here ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
