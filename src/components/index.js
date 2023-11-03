import SuperButton from "./SuperButton/index";
import SuperTable from "./SuperTable/index";
import SuperForm from "./SuperForm/index";
import SuperTags from "./SuperTags/index";
import ECharts from "./ECharts/index";

export { SuperButton, SuperTable, SuperForm, SuperTags, ECharts };

const install = (App) => {
  const components = [SuperButton, SuperTable, SuperForm, SuperTags, ECharts];
  components.forEach((component) => {
    App.component(component.name, component);
  });
};

export default { install };
