<script>
    export default {
        name: "MButtonGroup",
        props: {
            options: {
                type: Array
            }
        },
        render() {
            return (
                <div class="m-button-group">
                    {this.options.map(({ event, name, type, condition }) => {
                        return (
                            <m-button
                                type={type}
                                onclick={event}
                                v-show={condition}
                            >
                                {name}
                            </m-button>
                        );
                    })}
                </div>
            );
        }
    };
</script>
<style lang='scss'>
    .m-button-group {
        .m-button {
            margin-left: 10px;
            &:first-child {
                margin-left: 0;
            }
        }
    }
</style>