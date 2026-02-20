import { withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import _sfc_main$2 from "./StatisticsCard-Ds8-nRbZ.js";
import _sfc_main$3 from "./EmployeeWorkloadRow-BQDFolFH.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Workload",
  __ssrInlineRender: true,
  props: {
    employeeWorkloads: Array,
    bottlenecks: Array,
    capacitySummary: Object,
    filterOptions: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Team Workload &amp; Capacity </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Team Workload & Capacity ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Team Members",
              value: __props.capacitySummary.total_employees,
              icon: "👥",
              color: "blue"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Healthy Capacity",
              value: __props.capacitySummary.healthy_capacity,
              icon: "✅",
              color: "green"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Moderate Load",
              value: __props.capacitySummary.moderate_capacity,
              icon: "⚖️",
              color: "yellow"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Critical Load",
              value: __props.capacitySummary.critical_capacity,
              icon: "🚨",
              color: "red"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.bottlenecks.length > 0) {
              _push2(`<div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-8"${_scopeId}><h3 class="text-lg font-semibold text-red-900 mb-4"${_scopeId}>⚠️ Bottleneck Alert</h3><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.bottlenecks, (bottleneck) => {
                _push2(`<p class="text-sm text-red-800"${_scopeId}><strong${_scopeId}>${ssrInterpolate(bottleneck.name)}</strong> has ${ssrInterpolate(bottleneck.active_tasks)} active tasks and ${ssrInterpolate(bottleneck.overdue_tasks)} overdue - Status: <span class="font-semibold"${_scopeId}>${ssrInterpolate(bottleneck.bottleneck_level)}</span></p>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-6"${_scopeId}>Employee Workload Details</h3><div class="grid grid-cols-1 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.employeeWorkloads, (employee) => {
              _push2(ssrRenderComponent(_sfc_main$3, {
                key: employee.id,
                employee
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" }, [
                    createVNode(_sfc_main$2, {
                      title: "Team Members",
                      value: __props.capacitySummary.total_employees,
                      icon: "👥",
                      color: "blue"
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$2, {
                      title: "Healthy Capacity",
                      value: __props.capacitySummary.healthy_capacity,
                      icon: "✅",
                      color: "green"
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$2, {
                      title: "Moderate Load",
                      value: __props.capacitySummary.moderate_capacity,
                      icon: "⚖️",
                      color: "yellow"
                    }, null, 8, ["value"]),
                    createVNode(_sfc_main$2, {
                      title: "Critical Load",
                      value: __props.capacitySummary.critical_capacity,
                      icon: "🚨",
                      color: "red"
                    }, null, 8, ["value"])
                  ]),
                  __props.bottlenecks.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-red-50 border border-red-200 rounded-lg p-6 mb-8"
                  }, [
                    createVNode("h3", { class: "text-lg font-semibold text-red-900 mb-4" }, "⚠️ Bottleneck Alert"),
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.bottlenecks, (bottleneck) => {
                        return openBlock(), createBlock("p", {
                          key: bottleneck.id,
                          class: "text-sm text-red-800"
                        }, [
                          createVNode("strong", null, toDisplayString(bottleneck.name), 1),
                          createTextVNode(" has " + toDisplayString(bottleneck.active_tasks) + " active tasks and " + toDisplayString(bottleneck.overdue_tasks) + " overdue - Status: ", 1),
                          createVNode("span", { class: "font-semibold" }, toDisplayString(bottleneck.bottleneck_level), 1)
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-6" }, "Employee Workload Details"),
                      createVNode("div", { class: "grid grid-cols-1 gap-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.employeeWorkloads, (employee) => {
                          return openBlock(), createBlock(_sfc_main$3, {
                            key: employee.id,
                            employee
                          }, null, 8, ["employee"]);
                        }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Workload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
