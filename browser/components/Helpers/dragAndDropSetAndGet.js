let activeModuleId = null

const getActiveModuleId = () => activeModuleId
const setActiveModuleId = (id) => activeModuleId = id

export default {
	getActiveModuleId,
	setActiveModuleId
}