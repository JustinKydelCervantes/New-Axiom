import { ref, computed, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    notifications: Object,
    unreadCount: Number
  },
  setup(__props) {
    const props = __props;
    const localUnreadCount = ref(props.unreadCount);
    const processing = ref(false);
    const overdueNotifications = computed(() => {
      return props.notifications.data.filter((n) => n.data.type === "overdue");
    });
    const upcomingDeadlineNotifications = computed(() => {
      return props.notifications.data.filter((n) => n.data.type === "upcoming_deadline");
    });
    const generalNotifications = computed(() => {
      return props.notifications.data.filter((n) => n.data.type !== "overdue" && n.data.type !== "upcoming_deadline");
    });
    const markAsRead = (notificationId) => {
      processing.value = true;
      Inertia.post(route("notifications.read", notificationId), {}, {
        preserveState: true,
        replace: true,
        onSuccess: () => {
          localUnreadCount.value = Math.max(0, localUnreadCount.value - 1);
          const notification = props.notifications.data.find((n) => n.id === notificationId);
          if (notification && !notification.read_at) {
            notification.read_at = (/* @__PURE__ */ new Date()).toISOString();
          }
          processing.value = false;
        },
        onError: () => {
          processing.value = false;
        }
      });
    };
    const markAll = () => {
      if (localUnreadCount.value === 0) return;
      processing.value = true;
      Inertia.post(route("notifications.read-all"), {}, {
        preserveState: true,
        replace: true,
        onSuccess: () => {
          localUnreadCount.value = 0;
          props.notifications.data.forEach((n) => {
            if (!n.read_at) {
              n.read_at = (/* @__PURE__ */ new Date()).toISOString();
            }
          });
          processing.value = false;
        },
        onError: () => {
          processing.value = false;
        }
      });
    };
    const formatRelativeTime = (dateString) => {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 6e4);
      const diffHours = Math.floor(diffMs / 36e5);
      const diffDays = Math.floor(diffMs / 864e5);
      if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    };
    const getNotificationIcon = (type) => {
      switch (type) {
        case "overdue":
          return "⚠️";
        case "upcoming_deadline":
          return "⏰";
        default:
          return "🔔";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Notifications" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>Notifications</h2>`);
            if (localUnreadCount.value > 0) {
              _push2(`<button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="text-sm text-indigo-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(processing.value ? "Marking..." : "Mark all as read")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, "Notifications"),
                localUnreadCount.value > 0 ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: markAll,
                  disabled: processing.value,
                  class: "text-sm text-indigo-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                }, toDisplayString(processing.value ? "Marking..." : "Mark all as read"), 9, ["disabled"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6"${_scopeId}>`);
            if (overdueNotifications.value.length > 0) {
              _push2(`<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg overflow-hidden"${_scopeId}><div class="bg-red-100 dark:bg-red-900/40 px-4 py-3 flex items-center gap-2"${_scopeId}><span class="text-red-600 dark:text-red-400 text-lg"${_scopeId}>⚠️</span><h3 class="font-semibold text-red-800 dark:text-red-200"${_scopeId}>Overdue Tasks - Action Required</h3><span class="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full"${_scopeId}>${ssrInterpolate(overdueNotifications.value.length)} overdue </span></div><div class="divide-y divide-red-200 dark:divide-red-800"${_scopeId}><!--[-->`);
              ssrRenderList(overdueNotifications.value, (n) => {
                _push2(`<div class="${ssrRenderClass([n.read_at ? "opacity-60" : "", "p-4 flex items-start gap-3"])}"${_scopeId}><div class="flex-shrink-0 mt-1 text-red-500 text-xl"${_scopeId}>${ssrInterpolate(getNotificationIcon(n.data.type))}</div><div class="flex-1"${_scopeId}><p class="text-sm font-medium text-gray-900 dark:text-gray-100"${_scopeId}>${ssrInterpolate(n.data.message)}</p><p class="text-xs text-red-600 dark:text-red-400 mt-1"${_scopeId}> Due: ${ssrInterpolate(n.data.due_date || "Not specified")}</p><p class="text-xs text-red-500 mt-1"${_scopeId}>${ssrInterpolate(formatRelativeTime(n.created_at))}</p></div>`);
                if (!n.read_at) {
                  _push2(`<button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(processing.value ? "..." : "Mark done")}</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (upcomingDeadlineNotifications.value.length > 0) {
              _push2(`<div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg overflow-hidden"${_scopeId}><div class="bg-orange-100 dark:bg-orange-900/40 px-4 py-3 flex items-center gap-2"${_scopeId}><span class="text-orange-600 dark:text-orange-400 text-lg"${_scopeId}>⏰</span><h3 class="font-semibold text-orange-800 dark:text-orange-200"${_scopeId}>Upcoming Deadlines</h3><span class="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full"${_scopeId}>${ssrInterpolate(upcomingDeadlineNotifications.value.length)} upcoming </span></div><div class="divide-y divide-orange-200 dark:divide-orange-800"${_scopeId}><!--[-->`);
              ssrRenderList(upcomingDeadlineNotifications.value, (n) => {
                _push2(`<div class="${ssrRenderClass([n.read_at ? "opacity-60" : "", "p-4 flex items-start gap-3"])}"${_scopeId}><div class="flex-shrink-0 mt-1 text-orange-500 text-xl"${_scopeId}>${ssrInterpolate(getNotificationIcon(n.data.type))}</div><div class="flex-1"${_scopeId}><p class="text-sm font-medium text-gray-900 dark:text-gray-100"${_scopeId}>${ssrInterpolate(n.data.message)}</p><p class="text-xs text-orange-600 dark:text-orange-400 mt-1"${_scopeId}> Due: ${ssrInterpolate(n.data.due_date || "Not specified")}</p><p class="text-xs text-orange-500 mt-1"${_scopeId}>${ssrInterpolate(formatRelativeTime(n.created_at))}</p></div>`);
                if (!n.read_at) {
                  _push2(`<button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="text-xs bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(processing.value ? "..." : "Acknowledge")}</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex items-center gap-2"${_scopeId}><span class="text-gray-600 dark:text-gray-400 text-lg"${_scopeId}>📋</span><h3 class="font-semibold text-gray-800 dark:text-gray-200"${_scopeId}>All Notifications</h3></div>`);
            if (generalNotifications.value.length === 0 && overdueNotifications.value.length === 0 && upcomingDeadlineNotifications.value.length === 0) {
              _push2(`<div class="p-6 text-gray-500 text-center"${_scopeId}> No notifications yet. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(generalNotifications.value, (n) => {
              _push2(`<div class="${ssrRenderClass([n.read_at ? "" : "bg-indigo-50 dark:bg-indigo-900/20", "p-4 flex items-start gap-3"])}"${_scopeId}><div class="flex-shrink-0 mt-1"${_scopeId}><span class="text-xl"${_scopeId}>${ssrInterpolate(getNotificationIcon(n.data.type))}</span></div><div class="flex-1"${_scopeId}><p class="text-sm text-gray-900 dark:text-gray-100"${_scopeId}>${ssrInterpolate(n.data.message)}</p><p class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(formatRelativeTime(n.created_at))}</p></div>`);
              if (!n.read_at) {
                _push2(`<button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="text-xs text-indigo-600 hover:underline flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(processing.value ? "..." : "Mark read")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
            if (__props.notifications.last_page > 1) {
              _push2(`<div class="mt-4 flex justify-center gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.notifications.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url || "#",
                  class: ["px-3 py-1 text-sm rounded border", link.active ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300 text-gray-600 hover:bg-gray-50"]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6" }, [
                  overdueNotifications.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg overflow-hidden"
                  }, [
                    createVNode("div", { class: "bg-red-100 dark:bg-red-900/40 px-4 py-3 flex items-center gap-2" }, [
                      createVNode("span", { class: "text-red-600 dark:text-red-400 text-lg" }, "⚠️"),
                      createVNode("h3", { class: "font-semibold text-red-800 dark:text-red-200" }, "Overdue Tasks - Action Required"),
                      createVNode("span", { class: "ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full" }, toDisplayString(overdueNotifications.value.length) + " overdue ", 1)
                    ]),
                    createVNode("div", { class: "divide-y divide-red-200 dark:divide-red-800" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(overdueNotifications.value, (n) => {
                        return openBlock(), createBlock("div", {
                          key: n.id,
                          class: ["p-4 flex items-start gap-3", n.read_at ? "opacity-60" : ""]
                        }, [
                          createVNode("div", { class: "flex-shrink-0 mt-1 text-red-500 text-xl" }, toDisplayString(getNotificationIcon(n.data.type)), 1),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-gray-100" }, toDisplayString(n.data.message), 1),
                            createVNode("p", { class: "text-xs text-red-600 dark:text-red-400 mt-1" }, " Due: " + toDisplayString(n.data.due_date || "Not specified"), 1),
                            createVNode("p", { class: "text-xs text-red-500 mt-1" }, toDisplayString(formatRelativeTime(n.created_at)), 1)
                          ]),
                          !n.read_at ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: ($event) => markAsRead(n.id),
                            disabled: processing.value,
                            class: "text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          }, toDisplayString(processing.value ? "..." : "Mark done"), 9, ["onClick", "disabled"])) : createCommentVNode("", true)
                        ], 2);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  upcomingDeadlineNotifications.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg overflow-hidden"
                  }, [
                    createVNode("div", { class: "bg-orange-100 dark:bg-orange-900/40 px-4 py-3 flex items-center gap-2" }, [
                      createVNode("span", { class: "text-orange-600 dark:text-orange-400 text-lg" }, "⏰"),
                      createVNode("h3", { class: "font-semibold text-orange-800 dark:text-orange-200" }, "Upcoming Deadlines"),
                      createVNode("span", { class: "ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full" }, toDisplayString(upcomingDeadlineNotifications.value.length) + " upcoming ", 1)
                    ]),
                    createVNode("div", { class: "divide-y divide-orange-200 dark:divide-orange-800" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(upcomingDeadlineNotifications.value, (n) => {
                        return openBlock(), createBlock("div", {
                          key: n.id,
                          class: ["p-4 flex items-start gap-3", n.read_at ? "opacity-60" : ""]
                        }, [
                          createVNode("div", { class: "flex-shrink-0 mt-1 text-orange-500 text-xl" }, toDisplayString(getNotificationIcon(n.data.type)), 1),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-gray-100" }, toDisplayString(n.data.message), 1),
                            createVNode("p", { class: "text-xs text-orange-600 dark:text-orange-400 mt-1" }, " Due: " + toDisplayString(n.data.due_date || "Not specified"), 1),
                            createVNode("p", { class: "text-xs text-orange-500 mt-1" }, toDisplayString(formatRelativeTime(n.created_at)), 1)
                          ]),
                          !n.read_at ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: ($event) => markAsRead(n.id),
                            disabled: processing.value,
                            class: "text-xs bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          }, toDisplayString(processing.value ? "..." : "Acknowledge"), 9, ["onClick", "disabled"])) : createCommentVNode("", true)
                        ], 2);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg divide-y divide-gray-200 dark:divide-gray-700" }, [
                    createVNode("div", { class: "px-4 py-3 bg-gray-50 dark:bg-gray-700 flex items-center gap-2" }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400 text-lg" }, "📋"),
                      createVNode("h3", { class: "font-semibold text-gray-800 dark:text-gray-200" }, "All Notifications")
                    ]),
                    generalNotifications.value.length === 0 && overdueNotifications.value.length === 0 && upcomingDeadlineNotifications.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6 text-gray-500 text-center"
                    }, " No notifications yet. ")) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(generalNotifications.value, (n) => {
                      return openBlock(), createBlock("div", {
                        key: n.id,
                        class: ["p-4 flex items-start gap-3", n.read_at ? "" : "bg-indigo-50 dark:bg-indigo-900/20"]
                      }, [
                        createVNode("div", { class: "flex-shrink-0 mt-1" }, [
                          createVNode("span", { class: "text-xl" }, toDisplayString(getNotificationIcon(n.data.type)), 1)
                        ]),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("p", { class: "text-sm text-gray-900 dark:text-gray-100" }, toDisplayString(n.data.message), 1),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(formatRelativeTime(n.created_at)), 1)
                        ]),
                        !n.read_at ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => markAsRead(n.id),
                          disabled: processing.value,
                          class: "text-xs text-indigo-600 hover:underline flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        }, toDisplayString(processing.value ? "..." : "Mark read"), 9, ["onClick", "disabled"])) : createCommentVNode("", true)
                      ], 2);
                    }), 128))
                  ]),
                  __props.notifications.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "mt-4 flex justify-center gap-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.notifications.links, (link) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: link.label,
                        href: link.url || "#",
                        class: ["px-3 py-1 text-sm rounded border", link.active ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300 text-gray-600 hover:bg-gray-50"],
                        innerHTML: link.label
                      }, null, 8, ["href", "class", "innerHTML"]);
                    }), 128))
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Notifications/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
