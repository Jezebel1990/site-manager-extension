<template>
    <div class="wrapper">
        <h1 class="title">Gerenciador de Sites</h1>
        <div class="buttons">
            <button type="button" class="state-off" :class="{'is-active': !active}" @click="setActive(false)">Off</button>
            <button type="button" class="state-on" :class="{'is-active': active}" @click="setActive(true)">On</button>
        </div>
        <div class="sites">
            <p>Liste seus sites abaixo, um por linha</p>
            <textarea rows="8" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="list"></textarea>
        </div>
        <button type="button" class="state-save" @click="saveList">Salvar lista de sites</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: true,
            list: "exemplo.com",
            icons: {
                active: 'images/icon-48x48.png',
                inactive: 'images/icon-48x48-off.png'
            }
        }
    },
    created() {
        chrome.storage.sync.get(['toggleSitesActive', 'toggleSitesList'], (result) => {
            this.active = result.toggleSitesActive;
            this.list = result.toggleSitesList;
        });
    },
    methods: {
        setActive(active) {
            this.active = active;
            chrome.storage.sync.set({
                toggleSitesActive: active
            }, () => {});

            chrome.browserAction.setIcon({
                path: this.icons[active ? 'active' : 'inactive']
            });
        },
        saveList() {
            chrome.storage.sync.set({
                toggleSitesList: this.list
            }, () => {});
        }
    }
}
</script>