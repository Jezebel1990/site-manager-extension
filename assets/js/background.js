chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        toggleSitesActive: false,
        toggleSitesList: ["exemplo.com"]
    });
});

// Atualiza as regras de bloqueio sempre que a lista de sites for alterada
function updateRules(sites) {
    const rules = sites.map((site, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: "block" },
        condition: {
            urlFilter: site,
            resourceTypes: ["main_frame"]
        }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map(rule => rule.id),
        addRules: rules
    });
}

// Monitorar alterações no armazenamento para atualizar as regras
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync" && changes.toggleSitesList) {
        updateRules(changes.toggleSitesList.newValue);
    }
});

// Recupera a lista inicial de bloqueios ao iniciar
chrome.storage.sync.get("toggleSitesList", (data) => {
    if (data.toggleSitesList) {
        updateRules(data.toggleSitesList);
    }
});
