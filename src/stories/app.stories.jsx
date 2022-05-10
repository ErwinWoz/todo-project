import { App } from "../components/app";

export default {
    title: "App",
    component: App
}

const Template = (args) => <App {...args} />;

export const NormalApp = Template.bind({});
NormalApp.args = {
    // Props here
};