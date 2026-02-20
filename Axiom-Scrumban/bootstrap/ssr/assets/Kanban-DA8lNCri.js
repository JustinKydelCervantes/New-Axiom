import { unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { K as KanbanBoard } from "./KanbanBoard-BmM91TGQ.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vuedraggable";
import "axios";
const _sfc_main = {
  __name: "Kanban",
  __ssrInlineRender: true,
  props: {
    project: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.project.name + " - Kanban"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>${ssrInterpolate(__props.project.name)} - Kanban Board </h2><div class="space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("projects.show", __props.project.id),
              class: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` List View `);
                } else {
                  return [
                    createTextVNode(" List View ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, toDisplayString(__props.project.name) + " - Kanban Board ", 1),
                createVNode("div", { class: "space-x-2" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("projects.show", __props.project.id),
                    class: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" List View ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("tasks.create", { project_id: __props.project.id }),
                    class: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Create Task ")
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
            _push2(`<div class="py-12 h-screen"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full"${_scopeId}>`);
            _push2(ssrRenderComponent(KanbanBoard, {
              tasks: __props.project.tasks,
              projectId: __props.project.id,
              "initial-columns": __props.project.columns
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12 h-screen" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8 h-full" }, [
                  createVNode(KanbanBoard, {
                    tasks: __props.project.tasks,
                    projectId: __props.project.id,
                    "initial-columns": __props.project.columns
                  }, null, 8, ["tasks", "projectId", "initial-columns"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Kanban.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
