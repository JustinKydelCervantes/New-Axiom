import { ssrRenderAttrs } from "vue/server-renderer";
import { onMounted, useSSRContext } from "vue";
import Chart from "chart.js/auto";
const _sfc_main = {
  __name: "StatusChart",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const statusColors = {
      not_started: "#94a3b8",
      in_progress: "#3b82f6",
      blocked: "#ef4444",
      completed: "#10b981"
    };
    const statusLabels = {
      not_started: "Not Started",
      in_progress: "In Progress",
      blocked: "Blocked",
      completed: "Completed"
    };
    onMounted(() => {
      const ctx = document.getElementById("statusChart").getContext("2d");
      const labels = Object.keys(props.data).map((key) => statusLabels[key] || key);
      const values = Object.values(props.data).map((item) => item.count || 0);
      const colors = Object.keys(props.data).map((key) => statusColors[key] || "#6b7280");
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
              borderColor: "#ffffff",
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: { size: 12 },
                padding: 15,
                usePointStyle: true
              }
            }
          }
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><canvas id="statusChart"></canvas></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/StatusChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
