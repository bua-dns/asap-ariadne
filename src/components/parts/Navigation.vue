<script setup>
    import { computed, ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import { useNavStateStore } from '@/stores/nav-state.js';
    import { useFetchRoomPreviews } from '@/composables/useFetchRoomPreviews.js';
    import { useFetchFooter } from '@/composables/useFetchFooter.js';
    import { useFetchTheme } from '@/composables/useFetchTheme.js';
    import { useGetDerivate } from '@/composables/Utils.js';
    import Hamburger from '@/components/parts/Hamburger.vue';

    const { themeData, themeIsFetching, themeError } = useFetchTheme();
    const { data:roomsData, isFetching:roomsIsFetching, error:roomsError } = useFetchRoomPreviews();
    const { data:footerData, isFetching:footerIsFetching, error:footerError } = useFetchFooter();

    const rooms = computed(() => {
        return roomsData.value.data
            .map(room => room.attributes)
            .sort((a,b) => {
                a = parseInt(a.position);
                b = parseInt(b.position);
                if (a > b) return 1
                if (a < b) return -1
                else return 0
            })
    })

    const footer = computed(() => {
        return footerData.value
            .data[0].attributes
    })

    const navigation = computed(() => {
        return themeData.value.data[0].attributes.navi_items
    })

    const flyOut = ref(false);
    function toggleFlyOut() {
        flyOut.value = flyOut.value
            ? false
            : true;
    }
    
    const store = useNavStateStore();
    const { state } = storeToRefs(store);
    const { toggleState } = store;
    const { closeMobileNav } = store;
    
</script>


<template>
    <nav v-if="true">
        <div class="clickable mobile-nav">
            <Hamburger />
        </div>
        <Transition >
            <div class="fly-out" v-if="state === 'extended'">
                <div class="navi-upper">
                    <div class="fly-out-nav" v-if="themeData">
                        <div class="mobile-nav-main">
                            <ul>
                                <li
                                    v-for="(navEntry, index) in navigation"
                                    :key="`entry-${index}`"
                                >
                                    <RouterLink @click="toggleState()" :to="navEntry.link">{{ navEntry.text }}</RouterLink>
                                </li>
                            </ul>
                        </div>
                        <div class="mobile-nav-rooms">
                            <ul>
                                <li
                                    v-for="(room, index) in rooms"
                                    :key="`room-${index}`"
                                >
                                    <RouterLink @click="toggleState()" 
                                        :to="`/room/${room.position}`"
                                    >Raum {{ room.position }} - {{ room.title }}</RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="apparatus" v-if="footerData">
                        <!-- <pre>{{ footer }}</pre> -->
                        <div class="apparatus-text">
                            <div 
                                v-html="footer.contentblocks[0].content"
                            />
                        </div>
                        <div class="contact-info">
                            <h3>{{ footer.contentblocks[1].heading }}</h3>
                            <div 
                                v-html="footer.contentblocks[1].content"
                            />
                        </div>
                        
                    </div>
                </div>
                <div class="navi-footer">
                    <div class="logos">
                            <!-- {{ footer.contentblocks[2] }} -->
                            <a :href="footer.contentblocks[2].link" target="_blank">
                                <img :src="useGetDerivate(footer.contentblocks[2].image.url, 240,240)" alt="">
                            </a>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<style lang="scss" scoped>
h1,h2,h3,h4 {
    font-family: 'M PLUS 2', sans-serif;
}
 nav {
    width: 4rem;
    display: flex;
    align-items: center;
    font-size: 1.125rem;
    padding-right: 1rem;
    .mobile-nav {
        margin-left: auto;
        // height: var(--header-height);
        // width: var(--header-height);
    }
    .fly-out {
        position: fixed;
        background-color: var(--fly-out-color);
        top: calc(var(--header-height));
        left: 0;
        right: 0;
        max-height: calc(100vh - var(--header-height));
        overflow-y: scroll;
        display: block;
        .navi-upper {
            display: block;
            .fly-out-nav {
                padding: 2rem;
                .mobile-nav-main {
                    
                    }
                .mobile-nav-rooms {
                    padding-left: 2rem; 
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    li {
                        display: block;
                        padding: .5rem;
                        &:hover {
                            background-color: #fff;
                        }
                    }
                    &.mobile-nav-rooms {
                        padding-left: 2rem;
                    }
                }
            }
            .apparatus {
                padding: 2rem;
                & > div {
                    margin-bottom: 1.5rem;
                }
                .apparatus-text {
                    
                }

            }
        }
        .navi-footer {
            min-height: 200px;
            padding: 2rem;
            .logos {
                    a {
                        display: block;
                        img {
                            display: block;
                            margin-left: auto;
                        }
                    }
                }
        }
    }
}
@media (min-width: 768px) {
    nav {
        .mobile-nav {

        }
        .fly-out {

            .navi-upper {
                .fly-out-nav {
                    .mobile-nav-main {
                        
                        }
                    .mobile-nav-rooms {
                    }
                    ul {
                        li {

                            &:hover {
                            }
                        }
                        &.mobile-nav-rooms {
                        }
                    }
                }
                .apparatus {
                    & > div {
                    }
                    .apparatus-text {
                        
                    }

                }
            }
            .navi-footer {
                .logos {
                        a {
                            img {

                            }
                        }
                    }
            }
        }
    }

}
@media (min-width: 1024px) {
    nav {
        width: var(--header-lateral-elements-width);
        .fly-out {
            .navi-upper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                .fly-out-nav {
                }
                .apparatus {
                }
            }
            .navi-footer {
            }
        }
    }
}

.v-enter-active,
.v-leave-active {
    transform-origin: top;
    transition: transform .5s ease;
}
.v-enter-active .fly-out-content ,
.v-leave-active .fly-out-content{
    transition: opacity .25s ease;
}

.v-enter-from,
.v-leave-to {
    transform: scaleY(0);
}
.v-enter-to .fly-out-content ,
.v-enter-from .fly-out-content {
    opacity: 0;
}
.v-leave-to .fly-out-content {
    opacity: 0;
}
</style>

