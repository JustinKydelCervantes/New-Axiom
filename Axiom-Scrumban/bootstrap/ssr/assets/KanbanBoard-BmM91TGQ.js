import { ref, watch, onMounted, onUnmounted, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import draggable from "vuedraggable";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "KanbanBoard",
  __ssrInlineRender: true,
  props: {
    tasks: Array,
    projectId: Number,
    initialColumns: Array
  },
  setup(__props) {
    const props = __props;
    const columns = ref([]);
    const notification = ref(null);
    const editingWipColumnId = ref(null);
    const tempWipLimit = ref(null);
    const editorContainer = ref(null);
    const handleClickOutside = (event) => {
      if (editingWipColumnId.value && editorContainer.value) {
        const isClickInside = editorContainer.value.contains(event.target);
        const isActionButton = event.target.closest("button")?.contains(event.target);
        if (!isClickInside && !isActionButton) {
          cancelEditingWip();
        }
      }
    };
    const distributeTasks = () => {
      const tasks = Array.isArray(props.tasks) ? props.tasks : [];
      const initial = Array.isArray(props.initialColumns) && props.initialColumns.length ? props.initialColumns : Array.from(new Set(tasks.map((t) => t.status))).map((slug, idx) => ({
        id: `derived-${idx}`,
        name: slug ? slug.replace(/_/g, " ") : "Backlog",
        slug,
        wip_limit: null
      }));
      columns.value = initial.map((col) => ({
        ...col,
        tasks: tasks.filter((t) => t.column_id === col.id || !t.column_id && t.status === col.slug)
      }));
    };
    const isWipColumn = (column) => {
      return ["not_started", "in_progress"].includes(column.slug);
    };
    watch(() => [props.tasks, props.initialColumns], distributeTasks, { immediate: true });
    const onDragChange = (evt, column) => {
      if (evt.added) {
        const task = evt.added.element;
        moveTask(task, column.id);
      }
    };
    const moveTask = async (task, newColumnId) => {
      const oldColumnId = task.column_id;
      const oldStatus = task.status;
      task.column_id = newColumnId;
      try {
        await axios.patch(route("tasks.update-status", task.id), {
          column_id: newColumnId
        });
        showNotification("Task moved successfully", "success");
      } catch (error) {
        task.column_id = oldColumnId;
        task.status = oldStatus;
        const message = error.response?.data?.error || error.response?.data?.message || "Failed to move task";
        showNotification(message, "error");
        router.reload({ preserveScroll: true });
      }
    };
    const cancelEditingWip = () => {
      editingWipColumnId.value = null;
      tempWipLimit.value = null;
    };
    const showNotification = (message, type = "info") => {
      notification.value = { message, type };
      setTimeout(() => {
        notification.value = null;
      }, 3e3);
    };
    let channel = null;
    onMounted(() => {
      if (props.projectId && window.Echo) {
        channel = window.Echo.channel(`project.${props.projectId}`);
        channel.listen(".task.moved", (e) => {
          columns.value.forEach((col) => {
            const idx = col.tasks.findIndex((t) => t.id === e.task_id);
            if (idx !== -1) {
              const [task] = col.tasks.splice(idx, 1);
              const newCol = columns.value.find((c) => c.id === e.new_column_id);
              if (newCol) {
                task.status = e.new_status;
                task.column_id = e.new_column_id;
                newCol.tasks.push(task);
              }
            }
          });
        });
        channel.listen(".task.updated", (e) => {
          columns.value.forEach((col) => {
            const idx = col.tasks.findIndex((t) => t.id === e.task.id);
            if (idx !== -1) {
              col.tasks[idx] = { ...col.tasks[idx], ...e.task };
            }
          });
        });
      }
      document.addEventListener("mousedown", handleClickOutside);
    });
    onUnmounted(() => {
      if (props.projectId && window.Echo) {
        window.Echo.leaveChannel(`project.${props.projectId}`);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-full bg-gray-50 dark:bg-gray-950 p-6 rounded-xl shadow-inner relative overflow-hidden" }, _attrs))} data-v-d9cf535a>`);
      if (notification.value) {
        _push(`<div class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden" data-v-d9cf535a><div class="p-4" data-v-d9cf535a><div class="flex items-start" data-v-d9cf535a><div class="flex-shrink-0" data-v-d9cf535a>`);
        if (notification.value.type === "success") {
          _push(`<svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d9cf535a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d9cf535a></path></svg>`);
        } else if (notification.value.type === "error") {
          _push(`<svg class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d9cf535a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d9cf535a></path></svg>`);
        } else {
          _push(`<svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d9cf535a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d9cf535a></path></svg>`);
        }
        _push(`</div><div class="ml-3 w-0 flex-1 pt-0.5" data-v-d9cf535a><p class="text-sm font-medium text-gray-900 dark:text-gray-100" data-v-d9cf535a>${ssrInterpolate(notification.value.message)}</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-6 h-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600" data-v-d9cf535a><!--[-->`);
      ssrRenderList(columns.value, (column) => {
        _push(`<div class="w-80 flex-shrink-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 flex flex-col border border-gray-200 dark:border-gray-800" data-v-d9cf535a><div class="flex justify-between items-center mb-6 px-1" data-v-d9cf535a><div class="flex flex-col" data-v-d9cf535a><h3 class="font-bold text-gray-800 dark:text-gray-200 text-lg tracking-tight" data-v-d9cf535a>${ssrInterpolate(column.name)}</h3>`);
        if (isWipColumn(column)) {
          _push(`<span class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest" data-v-d9cf535a>${ssrInterpolate(column.tasks.length)} Tasks `);
          if (column.wip_limit) {
            _push(`<span class="${ssrRenderClass(column.tasks.length >= column.wip_limit ? "text-red-500" : "text-indigo-400")}" data-v-d9cf535a> / LIMIT:${ssrInterpolate(column.wip_limit)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<span class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest" data-v-d9cf535a>${ssrInterpolate(column.tasks.length)} Tasks </span>`);
        }
        _push(`</div>`);
        if (isWipColumn(column)) {
          _push(`<div class="relative" data-v-d9cf535a><button class="${ssrRenderClass([{ "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20": editingWipColumnId.value === column.id }, "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-600 transition-colors"])}" data-v-d9cf535a><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d9cf535a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" data-v-d9cf535a></path></svg></button>`);
          if (editingWipColumnId.value === column.id) {
            _push(`<div class="absolute right-0 top-full mt-2 z-50 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 animate-in fade-in slide-in-from-top-2 duration-200" data-v-d9cf535a><label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2" data-v-d9cf535a>Set WIP Limit</label><div class="space-y-3" data-v-d9cf535a><input type="number"${ssrRenderAttr("value", tempWipLimit.value)} placeholder="∞ Unlimited" class="w-full text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 h-9" autofocus data-v-d9cf535a><div class="flex gap-2" data-v-d9cf535a><button class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-lg transition-colors" data-v-d9cf535a> Save </button><button class="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-bold py-2 rounded-lg transition-colors" data-v-d9cf535a> Cancel </button></div></div><p class="mt-3 text-[10px] text-gray-400 leading-tight italic" data-v-d9cf535a>Leave blank for unlimited tasks.</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: column.tasks,
          "onUpdate:modelValue": ($event) => column.tasks = $event,
          group: "tasks",
          "item-key": "id",
          class: "flex-1 space-y-4 overflow-y-auto pr-1 custom-scrollbar min-h-[100px]",
          "ghost-class": "opacity-50",
          "drag-class": "rotate-1",
          onChange: ($event) => onDragChange($event, column)
        }, {
          item: withCtx(({ element }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([{
                "border-l-gray-300 dark:border-l-gray-600": element.priority === "low",
                "border-l-blue-400 dark:border-l-blue-500": element.priority === "medium",
                "border-l-orange-400 dark:border-l-orange-500": element.priority === "high",
                "border-l-rose-500 dark:border-l-rose-600": element.priority === "urgent"
              }, "group bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 cursor-grab active:cursor-grabbing border-l-4"])}" data-v-d9cf535a${_scopeId}><div class="flex justify-between items-start mb-3" data-v-d9cf535a${_scopeId}><span class="${ssrRenderClass([{
                "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300": element.priority === "low",
                "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400": element.priority === "medium",
                "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400": element.priority === "high",
                "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400": element.priority === "urgent"
              }, "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"])}" data-v-d9cf535a${_scopeId}>${ssrInterpolate(element.priority)}</span>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("tasks.edit", element.id),
                class: "opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-full"
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d9cf535a${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-d9cf535a${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "h-4 w-4 text-gray-400",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        })
                      ]))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><h4 class="font-bold text-gray-800 dark:text-gray-100 leading-snug mb-3 line-clamp-2" data-v-d9cf535a${_scopeId}>${ssrInterpolate(element.title)}</h4><div class="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center text-[11px]" data-v-d9cf535a${_scopeId}><div class="flex items-center text-gray-500 dark:text-gray-400" data-v-d9cf535a${_scopeId}><svg class="h-3.5 w-3.5 mr-1.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d9cf535a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-d9cf535a${_scopeId}></path></svg><span class="font-medium" data-v-d9cf535a${_scopeId}>${ssrInterpolate(element.assignee ? element.assignee.name : "Unassigned")}</span></div>`);
              if (element.due_date) {
                _push2(`<div class="flex items-center px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold" data-v-d9cf535a${_scopeId}><svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d9cf535a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-d9cf535a${_scopeId}></path></svg> ${ssrInterpolate(new Date(element.due_date).toLocaleDateString(void 0, { month: "short", day: "numeric" }))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: ["group bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 cursor-grab active:cursor-grabbing border-l-4", {
                    "border-l-gray-300 dark:border-l-gray-600": element.priority === "low",
                    "border-l-blue-400 dark:border-l-blue-500": element.priority === "medium",
                    "border-l-orange-400 dark:border-l-orange-500": element.priority === "high",
                    "border-l-rose-500 dark:border-l-rose-600": element.priority === "urgent"
                  }]
                }, [
                  createVNode("div", { class: "flex justify-between items-start mb-3" }, [
                    createVNode("span", {
                      class: ["px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", {
                        "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300": element.priority === "low",
                        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400": element.priority === "medium",
                        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400": element.priority === "high",
                        "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400": element.priority === "urgent"
                      }]
                    }, toDisplayString(element.priority), 3),
                    createVNode(unref(Link), {
                      href: _ctx.route("tasks.edit", element.id),
                      class: "opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-full"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-4 w-4 text-gray-400",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("h4", { class: "font-bold text-gray-800 dark:text-gray-100 leading-snug mb-3 line-clamp-2" }, toDisplayString(element.title), 1),
                  createVNode("div", { class: "mt-auto pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center text-[11px]" }, [
                    createVNode("div", { class: "flex items-center text-gray-500 dark:text-gray-400" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-3.5 w-3.5 mr-1.5 opacity-60",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        })
                      ])),
                      createVNode("span", { class: "font-medium" }, toDisplayString(element.assignee ? element.assignee.name : "Unassigned"), 1)
                    ]),
                    element.due_date ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-3 w-3 mr-1",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        })
                      ])),
                      createTextVNode(" " + toDisplayString(new Date(element.due_date).toLocaleDateString(void 0, { month: "short", day: "numeric" })), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ], 2)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/KanbanBoard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const KanbanBoard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d9cf535a"]]);
export {
  KanbanBoard as K
};
