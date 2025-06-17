import Lottie from "lottie-react"

const BasicLoading = ({ className }: { className: string }) => {
    return (
        <Lottie
            animationData={require('../../../public/animations/loading.json')}
            loop
            className={className}
        />
    )
}

export default BasicLoading;