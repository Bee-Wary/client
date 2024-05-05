import styles from '@/styles/Inspections.module.scss';

const InsepctionsPage = ({ ...props }) => {
  console.log('[Debug InsepctionsPage] rendered:', { props })

   return (
     <>
      {props.children}
     </>
   );
}

export default InsepctionsPage;