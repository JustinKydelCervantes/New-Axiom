import { ssrRenderAttrs } from "vue/server-renderer";
import { onMounted, useSSRContext } from "vue";
import Chart from "chart.js/auto";
const _sfc_main = {
  __name: "PriorityChart",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const priorityColors = {
      high: "#ef4444",
      medium: "#f59e0b",
      low: "#10b981"
    };
    onMounted(() => {
      const ctx = document.getElementById("priorityChart").getContext("2d");
      const labels = Object.keys(props.data).map((key) => key.charAt(0).toUpperCase() + key.slice(1));
      const values = Object.values(props.data);
      const colors = Object.keys(props.data).map((key) => priorityColors[key] || "#6b7280");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Tasks",
              data: values,
              backgroundColor: colors,
              borderColor: colors.map((c) => c + "dd"),
              borderWidth: 1,
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><canvas id="priorityChart"></canvas></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Components/PriorityChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
