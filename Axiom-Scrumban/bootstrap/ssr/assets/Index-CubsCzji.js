import { withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import _sfc_main$2 from "./StatisticsCard-Ds8-nRbZ.js";
import _sfc_main$3 from "./StatusChart-C8_9j3Ry.js";
import _sfc_main$4 from "./PriorityChart-DyLDC0ir.js";
import _sfc_main$5 from "./CriticalTasksList-CRncoipj.js";
import _sfc_main$6 from "./UpcomingTasksList-DVTJsLBr.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "chart.js/auto";
import "./PriorityBadge-DZZ5lc6Q.js";
import "./ProgressBar-B9HS8ur5.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    statistics: Object,
    statusBreakdown: Object,
    priorityBreakdown: Object,
    workloadSummary: Object,
    criticalTasks: Array,
    upcomingTasks: Array,
    filterOptions: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Task Monitoring Dashboard </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Task Monitoring Dashboard ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Total Tasks",
              value: __props.statistics.total_tasks,
              subtitle: "All tasks in system",
              icon: "📋",
              color: "blue"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "In Progress",
              value: __props.statistics.in_progress_tasks,
              subtitle: "Currently being worked on",
              icon: "⚙️",
              color: "yellow"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Overdue",
              value: __props.statistics.overdue_tasks,
              subtitle: "Need immediate attention",
              icon: "⚠️",
              color: "red"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Completion Rate",
              value: `${__props.statistics.completion_rate}%`,
              subtitle: "Overall progress",
              icon: "✅",
              color: "green"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Tasks by Status</h3>`);
            _push2(ssrRenderComponent(_sfc_main$3, { data: __props.statusBreakdown }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Priority Distribution</h3>`);
            _push2(ssrRenderComponent(_sfc_main$4, { data: __props.priorityBreakdown }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8"${_scopeId}><div class="p-6"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>Team Workload Status</h3>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard/workload",
              class: "text-blue-600 hover:text-blue-800 text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View Details → `);
                } else {
                  return [
                    createTextVNode(" View Details → ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 md:grid-cols-4 gap-4"${_scopeId}><div class="text-center p-4 bg-blue-50 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-blue-600"${_scopeId}>${ssrInterpolate(__props.workloadSummary.total_employees)}</div><p class="text-sm text-gray-600"${_scopeId}>Total Team Members</p></div><div class="text-center p-4 bg-green-50 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-green-600"${_scopeId}>${ssrInterpolate(__props.workloadSummary.healthy_capacity)}</div><p class="text-sm text-gray-600"${_scopeId}>Healthy Capacity</p></div><div class="text-center p-4 bg-yellow-50 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-yellow-600"${_scopeId}>${ssrInterpolate(__props.workloadSummary.moderate_capacity)}</div><p class="text-sm text-gray-600"${_scopeId}>Moderate Load</p></div><div class="text-center p-4 bg-red-50 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-red-600"${_scopeId}>${ssrInterpolate(__props.workloadSummary.critical_capacity)}</div><p class="text-sm text-gray-600"${_scopeId}>Critical Load</p></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>🚨 Critical Tasks</h3>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard/tasks?priority=high",
              class: "text-blue-600 hover:text-blue-800 text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View All `);
                } else {
                  return [
                    createTextVNode(" View All ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$5, { tasks: __props.criticalTasks }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>📅 Upcoming Tasks (Next 7 Days)</h3>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard/tasks",
              class: "text-blue-600 hover:text-blue-800 text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View All `);
                } else {
                  return [
                    createTextVNode(" View All ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$6, { tasks: __props.upcomingTasks }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" }, [
                    createVNode(_sfc_main$2, {
                      title: "Total Tasks",
                      value: __props.statistics.total_tasks,
                      subtitle: "All tasks in system",
                      icon: "📋",
                      color: "blue"
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$2, {
                      title: "In Progress",
                      value: __props.statistics.in_progress_tasks,
                      subtitle: "Currently being worked on",
                      icon: "⚙️",
                      color: "yellow"
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$2, {
                      title: "Overdue",
                      value: __props.statistics.overdue_tasks,
                      subtitle: "Need immediate attention",
                      icon: "⚠️",
                      color: "red"
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$2, {
                      title: "Completion Rate",
                      value: `${__props.statistics.completion_rate}%`,
                      subtitle: "Overall progress",
                      icon: "✅",
                      color: "green"
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Tasks by Status"),
                        createVNode(_sfc_main$3, { data: __props.statusBreakdown }, null, 8, ["data"])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Priority Distribution"),
                        createVNode(_sfc_main$4, { data: __props.priorityBreakdown }, null, 8, ["data"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Team Workload Status"),
                        createVNode(unref(Link), {
                          href: "/dashboard/workload",
                          class: "text-blue-600 hover:text-blue-800 text-sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" View Details → ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                        createVNode("div", { class: "text-center p-4 bg-blue-50 rounded-lg" }, [
                          createVNode("div", { class: "text-2xl font-bold text-blue-600" }, toDisplayString(__props.workloadSummary.total_employees), 1),
                          createVNode("p", { class: "text-sm text-gray-600" }, "Total Team Members")
                        ]),
                        createVNode("div", { class: "text-center p-4 bg-green-50 rounded-lg" }, [
                          createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(__props.workloadSummary.healthy_capacity), 1),
                          createVNode("p", { class: "text-sm text-gray-600" }, "Healthy Capacity")
                        ]),
                        createVNode("div", { class: "text-center p-4 bg-yellow-50 rounded-lg" }, [
                          createVNode("div", { class: "text-2xl font-bold text-yellow-600" }, toDisplayString(__props.workloadSummary.moderate_capacity), 1),
                          createVNode("p", { class: "text-sm text-gray-600" }, "Moderate Load")
                        ]),
                        createVNode("div", { class: "text-center p-4 bg-red-50 rounded-lg" }, [
                          createVNode("div", { class: "text-2xl font-bold text-red-600" }, toDisplayString(__props.workloadSummary.critical_capacity), 1),
                          createVNode("p", { class: "text-sm text-gray-600" }, "Critical Load")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "🚨 Critical Tasks"),
                          createVNode(unref(Link), {
                            href: "/dashboard/tasks?priority=high",
                            class: "text-blue-600 hover:text-blue-800 text-sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View All ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(_sfc_main$5, { tasks: __props.criticalTasks }, null, 8, ["tasks"])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "📅 Upcoming Tasks (Next 7 Days)"),
                          createVNode(unref(Link), {
                            href: "/dashboard/tasks",
                            class: "text-blue-600 hover:text-blue-800 text-sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View All ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(_sfc_main$6, { tasks: __props.upcomingTasks }, null, 8, ["tasks"])
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
