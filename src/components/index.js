import SuperButton from "./SuperButton/index";
import SuperTable from "./SuperTable/index";
import SuperForm from "./SuperForm/index";
import SuperTags from "./SuperTags/index";

export { SuperButton, SuperTable, SuperForm, SuperTags };

const install = (App) => {
  const components = [SuperButton, SuperTable, SuperForm, SuperTags];
  components.forEach((component) => {
    App.component(component.name, component);
  });
};

export default { install };
