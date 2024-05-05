

const Statisticspage = ({ ...props }) => {
  console.log('[Debug Statisticspage] rendered:', { props })

   return (
     <>
      {props.children}
     </>
   );
}

export default Statisticspage;