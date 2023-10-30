import SuperButton from "./SuperButton/index";
import SuperTable from "./SuperTable/index";
import SuperForm from "./SuperForm/index";

export { SuperButton, SuperTable, SuperForm };

const install = (App) => {
  const components = [SuperButton, SuperTable, SuperForm];
  components.forEach((component) => {
    App.component(component.name, component);
  });
};

export default { install };
