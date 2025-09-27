"use client";
import { useRouter } from "next/navigation";

export default function AssistantSelector() {
  const router = useRouter();
  
  const assistants = [
    {
      id: "asst_i56WaW0NXy8gea96ThSZ6gvT",
      name: "FAQ Vermeulen",
      description: "Onderhoudsvragen en reparaties",
      icon: "🔧",
      color: "blue"
    },
    {
      id: "asst_XXXXX", // Vul hier je tweede assistant ID in
      name: "Creative Writer",
      description: "Hulp bij creatief schrijven",
      icon: "✍️",
      color: "purple"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#f5f5f5'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        Kies je Assistant
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '800px',
        width: '100%'
      }}>
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            onClick={() => {
              localStorage.setItem('selectedAssistant', assistant.id);
              router.push('/chat');
            }}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {assistant.icon}
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {assistant.name}
            </h2>
            <p style={{ color: '#666' }}>
              {assistant.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
