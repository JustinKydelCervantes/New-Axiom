import { unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, withDirectives, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./InputLabel-DFrcifip.js";
import { P as PrimaryButton } from "./PrimaryButton-Cygj-hvK.js";
import "./DangerButton-Bk4jzFTS.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    project: Object,
    users: Array
  },
  setup(__props) {
    const props = __props;
    const memberForm = useForm({
      project_id: props.project.id,
      user_id: "",
      role: "member"
    });
    const addMember = () => {
      memberForm.post(route("project-members.store"), {
        preserveScroll: true,
        onSuccess: () => memberForm.reset("user_id", "role")
      });
    };
    const removeMember = (id) => {
      if (confirm("Are you sure you want to remove this member?")) {
        useForm({}).delete(route("project-members.destroy", id), {
          preserveScroll: true
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.project.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>${ssrInterpolate(__props.project.name)}</h2><div class="space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("projects.gantt", __props.project.id),
              class: "bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 📊 Gantt `);
                } else {
                  return [
                    createTextVNode(" 📊 Gantt ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("projects.kanban", __props.project.id),
              class: "bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Kanban Board `);
                } else {
                  return [
                    createTextVNode(" Kanban Board ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("projects.edit", __props.project.id),
              class: "text-sm text-blue-600 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Edit Project`);
                } else {
                  return [
                    createTextVNode("Edit Project")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, toDisplayString(__props.project.name), 1),
                createVNode("div", { class: "space-x-2" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("projects.gantt", __props.project.id),
                    class: "bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 📊 Gantt ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("projects.kanban", __props.project.id),
                    class: "bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Kanban Board ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("projects.edit", __props.project.id),
                    class: "text-sm text-blue-600 hover:underline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Edit Project")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"${_scopeId}><section${_scopeId}><header${_scopeId}><h2 class="text-lg font-medium text-gray-900 dark:text-gray-100"${_scopeId}>Project Details</h2></header><div class="mt-4 space-y-2 text-gray-600 dark:text-gray-400"${_scopeId}><p${_scopeId}><strong${_scopeId}>Status:</strong> ${ssrInterpolate(__props.project.status)}</p><p${_scopeId}><strong${_scopeId}>Description:</strong> ${ssrInterpolate(__props.project.description || "No description")}</p><p${_scopeId}><strong${_scopeId}>Dates:</strong> ${ssrInterpolate(__props.project.start_date || "N/A")} - ${ssrInterpolate(__props.project.end_date || "N/A")}</p><p${_scopeId}><strong${_scopeId}>Owner:</strong> ${ssrInterpolate(__props.project.owner.name)}</p></div></section></div><div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"${_scopeId}><section${_scopeId}><header class="flex justify-between items-center mb-4"${_scopeId}><h2 class="text-lg font-medium text-gray-900 dark:text-gray-100"${_scopeId}>Tasks</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("tasks.create", { project_id: __props.project.id }),
              class: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm"
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
            _push2(`</header><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Title</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Assigned To</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Due Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Actions</th></tr></thead><tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.project.tasks, (task) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(task.title)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([{
                "bg-gray-100 text-gray-800": task.status === "not_started",
                "bg-yellow-100 text-yellow-800": task.status === "in_progress",
                "bg-green-100 text-green-800": task.status === "completed",
                "bg-red-100 text-red-800": task.status === "blocked"
              }, "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(task.status.replace("_", " "))}</span></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(task.assignee ? task.assignee.name : "Unassigned")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(task.due_date || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("tasks.edit", task.id),
                class: "text-indigo-600 hover:text-indigo-900 mr-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Edit`);
                  } else {
                    return [
                      createTextVNode("Edit")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.project.tasks.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-4 text-center text-gray-500"${_scopeId}>No tasks created yet.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></section></div><div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"${_scopeId}><section${_scopeId}><header class="flex justify-between items-center mb-4"${_scopeId}><h2 class="text-lg font-medium text-gray-900 dark:text-gray-100"${_scopeId}>Team Members</h2></header><form class="flex gap-4 items-end mb-6"${_scopeId}><div class="flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "user_id",
              value: "User"
            }, null, _parent2, _scopeId));
            _push2(`<select id="user_id" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(memberForm).user_id) ? ssrLooseContain(unref(memberForm).user_id, "") : ssrLooseEqual(unref(memberForm).user_id, "")) ? " selected" : ""}${_scopeId}>Select User</option><!--[-->`);
            ssrRenderList(__props.users, (user) => {
              _push2(`<option${ssrRenderAttr("value", user.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(memberForm).user_id) ? ssrLooseContain(unref(memberForm).user_id, user.id) : ssrLooseEqual(unref(memberForm).user_id, user.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(user.name)} (${ssrInterpolate(user.email)}) </option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(memberForm).errors.user_id,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="w-32"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "role",
              value: "Role"
            }, null, _parent2, _scopeId));
            _push2(`<select id="role" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"${_scopeId}><option value="member"${ssrIncludeBooleanAttr(Array.isArray(unref(memberForm).role) ? ssrLooseContain(unref(memberForm).role, "member") : ssrLooseEqual(unref(memberForm).role, "member")) ? " selected" : ""}${_scopeId}>Member</option><option value="manager"${ssrIncludeBooleanAttr(Array.isArray(unref(memberForm).role) ? ssrLooseContain(unref(memberForm).role, "manager") : ssrLooseEqual(unref(memberForm).role, "manager")) ? " selected" : ""}${_scopeId}>Manager</option></select></div>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              disabled: unref(memberForm).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add Member`);
                } else {
                  return [
                    createTextVNode("Add Member")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Name</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Role</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Actions</th></tr></thead><tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.project.members, (member) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(member.user.name)}</td><td class="px-6 py-4 whitespace-nowrap capitalize"${_scopeId}>${ssrInterpolate(member.role)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><button class="text-red-600 hover:text-red-900"${_scopeId}>Remove</button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.project.members.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="3" class="px-6 py-4 text-center text-gray-500"${_scopeId}>No members assigned yet.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></section></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" }, [
                    createVNode("section", null, [
                      createVNode("header", null, [
                        createVNode("h2", { class: "text-lg font-medium text-gray-900 dark:text-gray-100" }, "Project Details")
                      ]),
                      createVNode("div", { class: "mt-4 space-y-2 text-gray-600 dark:text-gray-400" }, [
                        createVNode("p", null, [
                          createVNode("strong", null, "Status:"),
                          createTextVNode(" " + toDisplayString(__props.project.status), 1)
                        ]),
                        createVNode("p", null, [
                          createVNode("strong", null, "Description:"),
                          createTextVNode(" " + toDisplayString(__props.project.description || "No description"), 1)
                        ]),
                        createVNode("p", null, [
                          createVNode("strong", null, "Dates:"),
                          createTextVNode(" " + toDisplayString(__props.project.start_date || "N/A") + " - " + toDisplayString(__props.project.end_date || "N/A"), 1)
                        ]),
                        createVNode("p", null, [
                          createVNode("strong", null, "Owner:"),
                          createTextVNode(" " + toDisplayString(__props.project.owner.name), 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" }, [
                    createVNode("section", null, [
                      createVNode("header", { class: "flex justify-between items-center mb-4" }, [
                        createVNode("h2", { class: "text-lg font-medium text-gray-900 dark:text-gray-100" }, "Tasks"),
                        createVNode(unref(Link), {
                          href: _ctx.route("tasks.create", { project_id: __props.project.id }),
                          class: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create Task ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Title"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Status"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Assigned To"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Due Date"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.project.tasks, (task) => {
                            return openBlock(), createBlock("tr", {
                              key: task.id
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(task.title), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                    "bg-gray-100 text-gray-800": task.status === "not_started",
                                    "bg-yellow-100 text-yellow-800": task.status === "in_progress",
                                    "bg-green-100 text-green-800": task.status === "completed",
                                    "bg-red-100 text-red-800": task.status === "blocked"
                                  }]
                                }, toDisplayString(task.status.replace("_", " ")), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(task.assignee ? task.assignee.name : "Unassigned"), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(task.due_date || "-"), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("tasks.edit", task.id),
                                  class: "text-indigo-600 hover:text-indigo-900 mr-2"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Edit")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ])
                            ]);
                          }), 128)),
                          __props.project.tasks.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "5",
                              class: "px-6 py-4 text-center text-gray-500"
                            }, "No tasks created yet.")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" }, [
                    createVNode("section", null, [
                      createVNode("header", { class: "flex justify-between items-center mb-4" }, [
                        createVNode("h2", { class: "text-lg font-medium text-gray-900 dark:text-gray-100" }, "Team Members")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(addMember, ["prevent"]),
                        class: "flex gap-4 items-end mb-6"
                      }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode(_sfc_main$2, {
                            for: "user_id",
                            value: "User"
                          }),
                          withDirectives(createVNode("select", {
                            id: "user_id",
                            class: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",
                            "onUpdate:modelValue": ($event) => unref(memberForm).user_id = $event,
                            required: ""
                          }, [
                            createVNode("option", {
                              value: "",
                              disabled: ""
                            }, "Select User"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.users, (user) => {
                              return openBlock(), createBlock("option", {
                                key: user.id,
                                value: user.id
                              }, toDisplayString(user.name) + " (" + toDisplayString(user.email) + ") ", 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(memberForm).user_id]
                          ]),
                          createVNode(_sfc_main$3, {
                            message: unref(memberForm).errors.user_id,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "w-32" }, [
                          createVNode(_sfc_main$2, {
                            for: "role",
                            value: "Role"
                          }),
                          withDirectives(createVNode("select", {
                            id: "role",
                            class: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",
                            "onUpdate:modelValue": ($event) => unref(memberForm).role = $event
                          }, [
                            createVNode("option", { value: "member" }, "Member"),
                            createVNode("option", { value: "manager" }, "Manager")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(memberForm).role]
                          ])
                        ]),
                        createVNode(PrimaryButton, {
                          disabled: unref(memberForm).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Add Member")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ], 32),
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Name"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Role"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.project.members, (member) => {
                            return openBlock(), createBlock("tr", {
                              key: member.id
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(member.user.name), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap capitalize" }, toDisplayString(member.role), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("button", {
                                  onClick: ($event) => removeMember(member.id),
                                  class: "text-red-600 hover:text-red-900"
                                }, "Remove", 8, ["onClick"])
                              ])
                            ]);
                          }), 128)),
                          __props.project.members.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "3",
                              class: "px-6 py-4 text-center text-gray-500"
                            }, "No members assigned yet.")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
