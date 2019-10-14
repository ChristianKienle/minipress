import Vue, { ComponentOptions, PluginFunction, AsyncComponent } from 'vue'
export type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent
