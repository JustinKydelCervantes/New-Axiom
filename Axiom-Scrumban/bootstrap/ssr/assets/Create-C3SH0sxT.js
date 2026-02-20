import { unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./InputLabel-DFrcifip.js";
import { P as PrimaryButton } from "./PrimaryButton-Cygj-hvK.js";
import { _ as _sfc_main$3 } from "./TextInput-CIZgVg5y.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    project: Object,
    members: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      project_id: props.project.id,
      title: "",
      description: "",
      assigned_to: "",
      priority: "medium",
      status: "not_started",
      start_date: "",
      due_date: ""
    });
    const submit = () => {
      form.post(route("tasks.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Create Task" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>Create Task for ${ssrInterpolate(__props.project.name)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, "Create Task for " + toDisplayString(__props.project.name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}><form${_scopeId}><input type="hidden"${ssrRenderAttr("value", unref(form).project_id)}${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "title",
              value: "Task Title"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "title",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.title
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "description",
              value: "Description"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="description" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "assigned_to",
              value: "Assign To"
            }, null, _parent2, _scopeId));
            _push2(`<select id="assigned_to" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).assigned_to) ? ssrLooseContain(unref(form).assigned_to, "") : ssrLooseEqual(unref(form).assigned_to, "")) ? " selected" : ""}${_scopeId}>Unassigned</option><!--[-->`);
            ssrRenderList(__props.members, (member) => {
              _push2(`<option${ssrRenderAttr("value", member.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).assigned_to) ? ssrLooseContain(unref(form).assigned_to, member.id) : ssrLooseEqual(unref(form).assigned_to, member.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(member.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.assigned_to
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "priority",
              value: "Priority"
            }, null, _parent2, _scopeId));
            _push2(`<select id="priority" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"${_scopeId}><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "low") : ssrLooseEqual(unref(form).priority, "low")) ? " selected" : ""}${_scopeId}>Low</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "medium") : ssrLooseEqual(unref(form).priority, "medium")) ? " selected" : ""}${_scopeId}>Medium</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "high") : ssrLooseEqual(unref(form).priority, "high")) ? " selected" : ""}${_scopeId}>High</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "urgent") : ssrLooseEqual(unref(form).priority, "urgent")) ? " selected" : ""}${_scopeId}>Urgent</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.priority
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "start_date",
              value: "Start Date"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "start_date",
              type: "date",
              class: "mt-1 block w-full",
              modelValue: unref(form).start_date,
              "onUpdate:modelValue": ($event) => unref(form).start_date = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.start_date
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "due_date",
              value: "Due Date"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "due_date",
              type: "date",
              class: "mt-1 block w-full",
              modelValue: unref(form).due_date,
              "onUpdate:modelValue": ($event) => unref(form).due_date = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.due_date
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("projects.show", __props.project.id),
              class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(PrimaryButton, {
              class: ["ms-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Task `);
                } else {
                  return [
                    createTextVNode(" Create Task ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        withDirectives(createVNode("input", {
                          type: "hidden",
                          "onUpdate:modelValue": ($event) => unref(form).project_id = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).project_id]
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "title",
                            value: "Task Title"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "title",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            required: "",
                            autofocus: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.title
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mt-4" }, [
                          createVNode(_sfc_main$2, {
                            for: "description",
                            value: "Description"
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            class: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.description
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "assigned_to",
                              value: "Assign To"
                            }),
                            withDirectives(createVNode("select", {
                              id: "assigned_to",
                              class: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",
                              "onUpdate:modelValue": ($event) => unref(form).assigned_to = $event
                            }, [
                              createVNode("option", { value: "" }, "Unassigned"),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                                return openBlock(), createBlock("option", {
                                  key: member.id,
                                  value: member.id
                                }, toDisplayString(member.name), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).assigned_to]
                            ]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.assigned_to
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "priority",
                              value: "Priority"
                            }),
                            withDirectives(createVNode("select", {
                              id: "priority",
                              class: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",
                              "onUpdate:modelValue": ($event) => unref(form).priority = $event
                            }, [
                              createVNode("option", { value: "low" }, "Low"),
                              createVNode("option", { value: "medium" }, "Medium"),
                              createVNode("option", { value: "high" }, "High"),
                              createVNode("option", { value: "urgent" }, "Urgent")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).priority]
                            ]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.priority
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "start_date",
                              value: "Start Date"
                            }),
                            createVNode(_sfc_main$3, {
                              id: "start_date",
                              type: "date",
                              class: "mt-1 block w-full",
                              modelValue: unref(form).start_date,
                              "onUpdate:modelValue": ($event) => unref(form).start_date = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.start_date
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "due_date",
                              value: "Due Date"
                            }),
                            createVNode(_sfc_main$3, {
                              id: "due_date",
                              type: "date",
                              class: "mt-1 block w-full",
                              modelValue: unref(form).due_date,
                              "onUpdate:modelValue": ($event) => unref(form).due_date = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.due_date
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("projects.show", __props.project.id),
                            class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(PrimaryButton, {
                            class: ["ms-4", { "opacity-25": unref(form).processing }],
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Create Task ")
                            ]),
                            _: 1
                          }, 8, ["class", "disabled"])
                        ])
                      ], 32)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Tasks/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
