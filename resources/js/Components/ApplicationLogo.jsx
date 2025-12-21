export default function ApplicationLogo({ className = '' }) {
    return (
        <img 
            src="/images/logo.png" 
            alt="OperaSys"
            className={className}
        />
    );
}
