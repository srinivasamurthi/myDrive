export const setViewContent = (viewContent, viewContentShow) => ({
    type: "SET_VIEW_CONTENT", 
    viewContent,
    viewContentShow,
})

export const removeViewContent = () => ({
    type: "REMOVE_VIEW_CONTENT",
})
