import { Topbar } from "./_components/topbar";

const CollectionsLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
     
    <>
     <div className="w-full flex items-center justify-between px-6 bg-custom-primary h-16 sm:h-24">
        <Topbar />
      </div>
      <main className="p-6 space-y-4">
        {children}
      </main>
    </>
   );
}
 
export default CollectionsLayout;