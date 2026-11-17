import ClubCard from "../components/PostCard";

export default function Haome() {
    return (
        <main>
            <h1> Touchline App </h1>
            <ClubCard 
                name="Barcelona"
                description="We are so sorry for losing"
            />

            <ClubCard 
                name="Real Madrid"
                description="We did it "
            />
            <ClubCard 
                name="Malaga"
                description="OOOH that so awsome we are in the division 1"
            />

        </main>
    );
}    


     