import SuperButton from "./Super-Button/index";
import SuperTable from "./Super-Table/index";
import SuperForm from "./Super-Form/index";
import SuperTags from "./Super-Tags/index";
import ECharts from "./ECharts/index";
import AuthLogin from "./Auth-Login/index";

export { SuperButton, SuperTable, SuperForm, SuperTags, ECharts, AuthLogin };

const install = (App) => {
  const components = [SuperButton, SuperTable, SuperForm, SuperTags, ECharts, AuthLogin];
  components.forEach((component) => {
    App.component(component.name, component);
  });
};

export default { install };
