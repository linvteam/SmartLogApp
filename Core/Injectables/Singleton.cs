using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Injectables {
    /// <summary>
    /// Associa alla classe l'attributo Singleton che permette a questa classe di essere registrata come singleton nel dependcy injector
    /// </summary>
    public class Singleton : Injectable {
        /// <summary>
        /// Indica l'interfaccia di base da cui la classe marcata come Singleton eredita
        /// </summary>
        readonly Type? baseInterface;

        /// <summary>
        /// Indica che la classe a cui viene assegnato l'attributo Singleton è iniettabile dal dependency injector come Singleton
        /// </summary>
        /// <param name="baseInterface">L'eventuale inferfaccia che la classe implementa</param>
        public Singleton(Type? baseInterface = null) {
            this.baseInterface = baseInterface;
        }

        /// <summary>
        /// Inietta come singleton la classe annotata come Singleton
        /// </summary>
        /// <param name="builder">Il builder che si occupa di creare la web app</param>
        /// <param name="actualClass">La classe corrente da registrare</param>
        public override void Inject(WebApplicationBuilder builder, Type actualClass) {

            if(baseInterface == null) {
                builder.Services.AddSingleton(actualClass);
            } else {
                builder.Services.AddSingleton(baseInterface, actualClass);
            }
            
        }
    }
}
