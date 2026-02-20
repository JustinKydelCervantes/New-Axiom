import { unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    projects: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Projects" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>Projects</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, "Projects")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><h3 class="text-lg font-medium"${_scopeId}>Project List</h3>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("projects.create"),
              class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Project `);
                } else {
                  return [
                    createTextVNode(" Create Project ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Name</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Owner</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Actions</th></tr></thead><tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.projects, (project) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("projects.show", project.id),
                class: "text-indigo-600 hover:underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(project.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(project.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([{
                "bg-green-100 text-green-800": project.status === "active",
                "bg-yellow-100 text-yellow-800": project.status === "on_hold",
                "bg-blue-100 text-blue-800": project.status === "completed"
              }, "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(project.status)}</span></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(project.owner.name)}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("projects.edit", project.id),
                class: "text-indigo-600 hover:text-indigo-900 mr-3"
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
            _push2(`<!--]--></tbody></table></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, [
                      createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                        createVNode("h3", { class: "text-lg font-medium" }, "Project List"),
                        createVNode(unref(Link), {
                          href: _ctx.route("projects.create"),
                          class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create Project ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Name"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Status"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Owner"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.projects, (project) => {
                            return openBlock(), createBlock("tr", {
                              key: project.id
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("projects.show", project.id),
                                  class: "text-indigo-600 hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(project.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                    "bg-green-100 text-green-800": project.status === "active",
                                    "bg-yellow-100 text-yellow-800": project.status === "on_hold",
                                    "bg-blue-100 text-blue-800": project.status === "completed"
                                  }]
                                }, toDisplayString(project.status), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(project.owner.name), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("projects.edit", project.id),
                                  class: "text-indigo-600 hover:text-indigo-900 mr-3"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Edit")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ])
                            ]);
                          }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
