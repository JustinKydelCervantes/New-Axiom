import { unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelCheckbox, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./InputLabel-DFrcifip.js";
import { P as PrimaryButton } from "./PrimaryButton-Cygj-hvK.js";
import { D as DangerButton } from "./DangerButton-Bk4jzFTS.js";
import { _ as _sfc_main$3 } from "./TextInput-CIZgVg5y.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    task: Object,
    project: Object,
    members: Array,
    availableTasks: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: props.task.title,
      description: props.task.description,
      assigned_to: props.task.assigned_to,
      priority: props.task.priority,
      status: props.task.status,
      progress_percent: props.task.progress_percent,
      start_date: props.task.start_date,
      due_date: props.task.due_date,
      dependencies: props.task.dependencies ? props.task.dependencies.map((d) => d.id) : []
    });
    const submit = () => {
      form.put(route("tasks.update", props.task.id));
    };
    const destroy = () => {
      if (confirm("Are you sure you want to delete this task?")) {
        form.delete(route("tasks.destroy", props.task.id));
      }
    };
    const commentForm = useForm({ body: "" });
    const submitComment = () => {
      commentForm.post(route("task-comments.store", props.task.id), {
        onSuccess: () => commentForm.reset()
      });
    };
    const timeForm = useForm({ hours: "", description: "", logged_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) });
    const submitTime = () => {
      timeForm.post(route("time-logs.store", props.task.id), {
        onSuccess: () => timeForm.reset()
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: "Edit Task: " + __props.task.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>Edit Task: ${ssrInterpolate(__props.task.title)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, "Edit Task: " + toDisplayString(__props.task.title), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}><form${_scopeId}><div${_scopeId}>`);
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
              for: "status",
              value: "Status"
            }, null, _parent2, _scopeId));
            _push2(`<select id="status" class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"${_scopeId}><option value="not_started"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "not_started") : ssrLooseEqual(unref(form).status, "not_started")) ? " selected" : ""}${_scopeId}>Not Started</option><option value="in_progress"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "in_progress") : ssrLooseEqual(unref(form).status, "in_progress")) ? " selected" : ""}${_scopeId}>In Progress</option><option value="completed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "completed") : ssrLooseEqual(unref(form).status, "completed")) ? " selected" : ""}${_scopeId}>Completed</option><option value="blocked"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "blocked") : ssrLooseEqual(unref(form).status, "blocked")) ? " selected" : ""}${_scopeId}>Blocked</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.status
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "progress_percent",
              value: "Progress (%)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "progress_percent",
              type: "number",
              min: "0",
              max: "100",
              class: "mt-1 block w-full",
              modelValue: unref(form).progress_percent,
              "onUpdate:modelValue": ($event) => unref(form).progress_percent = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.progress_percent
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
            _push2(`</div></div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Dependencies" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.availableTasks, (t) => {
              _push2(`<label class="inline-flex items-center"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", t.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).dependencies) ? ssrLooseContain(unref(form).dependencies, t.id) : unref(form).dependencies) ? " checked" : ""} class="rounded border-gray-300 text-indigo-600 shadow-sm"${_scopeId}><span class="ml-2 text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(t.title)} (${ssrInterpolate(t.status)})</span></label>`);
            });
            _push2(`<!--]--></div>`);
            if (__props.availableTasks.length === 0) {
              _push2(`<p class="text-xs text-gray-500 mt-1"${_scopeId}>No other tasks available.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center justify-between mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(DangerButton, {
              onClick: destroy,
              type: "button",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Delete Task`);
                } else {
                  return [
                    createTextVNode("Delete Task")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("projects.show", __props.project.id),
              class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(PrimaryButton, {
              class: "ms-4",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Update Task`);
                } else {
                  return [
                    createTextVNode("Update Task")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></form></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4"${_scopeId}>Comments</h3><div class="space-y-4 mb-6"${_scopeId}>`);
            if (__props.task.comments.length === 0) {
              _push2(`<div class="text-gray-500 text-sm"${_scopeId}>No comments yet.</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.task.comments, (comment) => {
              _push2(`<div class="flex gap-3"${_scopeId}><div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium"${_scopeId}>${ssrInterpolate(comment.user.name.charAt(0))}</div><div class="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3"${_scopeId}><div class="flex justify-between items-center mb-1"${_scopeId}><span class="text-sm font-medium text-gray-900 dark:text-gray-100"${_scopeId}>${ssrInterpolate(comment.user.name)}</span><span class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(comment.created_at)}</span></div><p class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(comment.body)}</p></div></div>`);
            });
            _push2(`<!--]--></div><form class="flex gap-3"${_scopeId}><textarea placeholder="Add a comment..." rows="2" class="flex-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"${_scopeId}>${ssrInterpolate(unref(commentForm).body)}</textarea>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              type: "submit",
              disabled: unref(commentForm).processing,
              class: "self-end"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Post`);
                } else {
                  return [
                    createTextVNode("Post")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4"${_scopeId}>Time Tracking</h3><div class="mb-4"${_scopeId}>`);
            if (__props.task.time_logs && __props.task.time_logs.length === 0) {
              _push2(`<div class="text-gray-500 text-sm"${_scopeId}>No time logged yet.</div>`);
            } else {
              _push2(`<table class="min-w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="text-left text-gray-500 dark:text-gray-400"${_scopeId}><th class="pb-2"${_scopeId}>User</th><th class="pb-2"${_scopeId}>Hours</th><th class="pb-2"${_scopeId}>Date</th><th class="pb-2"${_scopeId}>Note</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.task.time_logs, (log) => {
                _push2(`<tr${_scopeId}><td class="py-2"${_scopeId}>${ssrInterpolate(log.user.name)}</td><td class="py-2 font-medium"${_scopeId}>${ssrInterpolate(log.hours)}h</td><td class="py-2 text-gray-500"${_scopeId}>${ssrInterpolate(log.logged_at)}</td><td class="py-2 text-gray-500"${_scopeId}>${ssrInterpolate(log.description || "-")}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table>`);
            }
            if (__props.task.time_logs && __props.task.time_logs.length > 0) {
              _push2(`<p class="text-sm font-medium text-indigo-600 mt-2"${_scopeId}> Total: ${ssrInterpolate(__props.task.time_logs.reduce((s, l) => s + parseFloat(l.hours), 0).toFixed(1))}h </p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><form class="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Hours" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              type: "number",
              step: "0.5",
              min: "0.5",
              max: "24",
              modelValue: unref(timeForm).hours,
              "onUpdate:modelValue": ($event) => unref(timeForm).hours = $event,
              class: "mt-1 block w-full",
              placeholder: "e.g. 2.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Date" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              type: "date",
              modelValue: unref(timeForm).logged_at,
              "onUpdate:modelValue": ($event) => unref(timeForm).logged_at = $event,
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Note (optional)" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              type: "text",
              modelValue: unref(timeForm).description,
              "onUpdate:modelValue": ($event) => unref(timeForm).description = $event,
              class: "mt-1 block w-full",
              placeholder: "What did you work on?"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              type: "submit",
              disabled: unref(timeForm).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Log Time`);
                } else {
                  return [
                    createTextVNode("Log Time")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
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
                              for: "status",
                              value: "Status"
                            }),
                            withDirectives(createVNode("select", {
                              id: "status",
                              class: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",
                              "onUpdate:modelValue": ($event) => unref(form).status = $event
                            }, [
                              createVNode("option", { value: "not_started" }, "Not Started"),
                              createVNode("option", { value: "in_progress" }, "In Progress"),
                              createVNode("option", { value: "completed" }, "Completed"),
                              createVNode("option", { value: "blocked" }, "Blocked")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).status]
                            ]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.status
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              for: "progress_percent",
                              value: "Progress (%)"
                            }),
                            createVNode(_sfc_main$3, {
                              id: "progress_percent",
                              type: "number",
                              min: "0",
                              max: "100",
                              class: "mt-1 block w-full",
                              modelValue: unref(form).progress_percent,
                              "onUpdate:modelValue": ($event) => unref(form).progress_percent = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$4, {
                              class: "mt-2",
                              message: unref(form).errors.progress_percent
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
                        createVNode("div", { class: "mt-4" }, [
                          createVNode(_sfc_main$2, { value: "Dependencies" }),
                          createVNode("div", { class: "mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.availableTasks, (t) => {
                              return openBlock(), createBlock("label", {
                                key: t.id,
                                class: "inline-flex items-center"
                              }, [
                                withDirectives(createVNode("input", {
                                  type: "checkbox",
                                  value: t.id,
                                  "onUpdate:modelValue": ($event) => unref(form).dependencies = $event,
                                  class: "rounded border-gray-300 text-indigo-600 shadow-sm"
                                }, null, 8, ["value", "onUpdate:modelValue"]), [
                                  [vModelCheckbox, unref(form).dependencies]
                                ]),
                                createVNode("span", { class: "ml-2 text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(t.title) + " (" + toDisplayString(t.status) + ")", 1)
                              ]);
                            }), 128))
                          ]),
                          __props.availableTasks.length === 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-gray-500 mt-1"
                          }, "No other tasks available.")) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between mt-6" }, [
                          createVNode(DangerButton, {
                            onClick: destroy,
                            type: "button",
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Delete Task")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("projects.show", __props.project.id),
                              class: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancel")
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            createVNode(PrimaryButton, {
                              class: "ms-4",
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Update Task")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ])
                      ], 32)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4" }, "Comments"),
                      createVNode("div", { class: "space-y-4 mb-6" }, [
                        __props.task.comments.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-gray-500 text-sm"
                        }, "No comments yet.")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.task.comments, (comment) => {
                          return openBlock(), createBlock("div", {
                            key: comment.id,
                            class: "flex gap-3"
                          }, [
                            createVNode("div", { class: "flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium" }, toDisplayString(comment.user.name.charAt(0)), 1),
                            createVNode("div", { class: "flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3" }, [
                              createVNode("div", { class: "flex justify-between items-center mb-1" }, [
                                createVNode("span", { class: "text-sm font-medium text-gray-900 dark:text-gray-100" }, toDisplayString(comment.user.name), 1),
                                createVNode("span", { class: "text-xs text-gray-500" }, toDisplayString(comment.created_at), 1)
                              ]),
                              createVNode("p", { class: "text-sm text-gray-700 dark:text-gray-300" }, toDisplayString(comment.body), 1)
                            ])
                          ]);
                        }), 128))
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitComment, ["prevent"]),
                        class: "flex gap-3"
                      }, [
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(commentForm).body = $event,
                          placeholder: "Add a comment...",
                          rows: "2",
                          class: "flex-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(commentForm).body]
                        ]),
                        createVNode(PrimaryButton, {
                          type: "submit",
                          disabled: unref(commentForm).processing,
                          class: "self-end"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Post")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ], 32)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4" }, "Time Tracking"),
                      createVNode("div", { class: "mb-4" }, [
                        __props.task.time_logs && __props.task.time_logs.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-gray-500 text-sm"
                        }, "No time logged yet.")) : (openBlock(), createBlock("table", {
                          key: 1,
                          class: "min-w-full text-sm"
                        }, [
                          createVNode("thead", null, [
                            createVNode("tr", { class: "text-left text-gray-500 dark:text-gray-400" }, [
                              createVNode("th", { class: "pb-2" }, "User"),
                              createVNode("th", { class: "pb-2" }, "Hours"),
                              createVNode("th", { class: "pb-2" }, "Date"),
                              createVNode("th", { class: "pb-2" }, "Note")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.task.time_logs, (log) => {
                              return openBlock(), createBlock("tr", {
                                key: log.id
                              }, [
                                createVNode("td", { class: "py-2" }, toDisplayString(log.user.name), 1),
                                createVNode("td", { class: "py-2 font-medium" }, toDisplayString(log.hours) + "h", 1),
                                createVNode("td", { class: "py-2 text-gray-500" }, toDisplayString(log.logged_at), 1),
                                createVNode("td", { class: "py-2 text-gray-500" }, toDisplayString(log.description || "-"), 1)
                              ]);
                            }), 128))
                          ])
                        ])),
                        __props.task.time_logs && __props.task.time_logs.length > 0 ? (openBlock(), createBlock("p", {
                          key: 2,
                          class: "text-sm font-medium text-indigo-600 mt-2"
                        }, " Total: " + toDisplayString(__props.task.time_logs.reduce((s, l) => s + parseFloat(l.hours), 0).toFixed(1)) + "h ", 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitTime, ["prevent"]),
                        class: "grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, { value: "Hours" }),
                          createVNode(_sfc_main$3, {
                            type: "number",
                            step: "0.5",
                            min: "0.5",
                            max: "24",
                            modelValue: unref(timeForm).hours,
                            "onUpdate:modelValue": ($event) => unref(timeForm).hours = $event,
                            class: "mt-1 block w-full",
                            placeholder: "e.g. 2.5"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, { value: "Date" }),
                          createVNode(_sfc_main$3, {
                            type: "date",
                            modelValue: unref(timeForm).logged_at,
                            "onUpdate:modelValue": ($event) => unref(timeForm).logged_at = $event,
                            class: "mt-1 block w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, { value: "Note (optional)" }),
                          createVNode(_sfc_main$3, {
                            type: "text",
                            modelValue: unref(timeForm).description,
                            "onUpdate:modelValue": ($event) => unref(timeForm).description = $event,
                            class: "mt-1 block w-full",
                            placeholder: "What did you work on?"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(PrimaryButton, {
                          type: "submit",
                          disabled: unref(timeForm).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Log Time")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Tasks/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
