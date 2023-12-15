import {createApp} from 'vue'
import {defineComponent, ref} from 'vue'
import {ElButton, ElDialog} from 'element-plus'
import {CoffeeCup, Close, Delete} from "@element-plus/icons-vue";

/**
 * 组件
 */
const BaseDialog = defineComponent({
    /**
     * 参数
     */
    props: {
        close: {
            type: Function,
            required: true,
            default: () => () => {
            }
        },


        title: {
            type: String,
            required: false,
            default: () => ''
        },
        msg: {
            type: String,
            required: false,
            default: () => ''
        },
    },
    /**
     * 业务逻辑
     */
    setup(props) {
        const visible = ref(true)
        const handleClose = () => {
            visible.value = false
            props.close()
        }

        return {
            visible,
            handleClose,
        }
    },
    /**
     * 组件
     */
    render(props) {
        return (
            <ElDialog
                draggable
                width={'32%'}
                close-on-click-modal={false}
                modelValue={props.visible}
                onClose={props.handleClose}
                title={props.title}>
                <ul>
                    <li>
                        <ElButton icon={CoffeeCup} style={{width: '100%', height: '50px'}} type="primary"
                                  text>升级会员</ElButton>
                    </li>
                    <li>
                        <ElButton icon={Delete} style={{width: '100%', height: '50px'}} type="danger"
                                  text>清除所有聊天</ElButton>
                    </li>
                    <li>
                        <ElButton icon={Close} style={{width: '100%', height: '50px'}} type="danger"
                                  text>退出登录</ElButton>
                    </li>
                </ul>
            </ElDialog>
        )
    }
})

/**
 * 显示弹窗
 * 调用方法：
 *    const onPass = data => {
 *        console.log('通过', data)
 *    }
 *    const onReject = data => {
 *        console.log('驳回', data)
 *    }
 *    const { showDialog, closeDialog } = useDialog({
 *        msg: 'Hello',
 *        title: '是否提交审核？',
 *        onPass,
 *        onReject
 *    })
 *    showDialog()
 */
const useSettingDialog = props => {
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    const close = () => {
        dialog.unmount()
        mountNode.remove()
    }
    const show = () => {
        // 挂载显示
        dialog.mount(mountNode)
    }
    const dialog = createApp(BaseDialog, {...props, close})
    return {
        show,
        close
    }
}
export default useSettingDialog