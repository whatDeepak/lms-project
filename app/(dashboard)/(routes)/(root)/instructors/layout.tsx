"use client"
const InstructorsLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {


  return ( 
    <>
      <main className="">
        {children}
      </main>
    </>
   );
}
 
export default InstructorsLayout;