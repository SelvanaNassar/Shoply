import Button from "./Button";

export default function EmptyState({icon: Icon, title, description, onClick, children}){
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-3">

            <Icon className="size-[128px] text-button"/>

            <h3>{title}</h3>

            <p>{description}</p>

            {children
                ? <Button onClick={onClick} type="button">       
                    {children}
                  </Button>
                : "" 
            }

          </div>
    );
}
