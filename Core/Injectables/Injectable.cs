using Microsoft.AspNetCore.Builder;
using System.Reflection;

namespace Core.Injectables {
    /// <summary>
    /// Classe base per le classi iniettabili come servizi nel dependency injector di .NET
    /// </summary>
    public abstract class Injectable: System.Attribute {
        /// <summary>
        /// Inietta la classe indicata nel builder
        /// </summary>
        /// <param name="builder">Il builder che si occupa di creare la web app</param>
        /// <param name="actualClass">La classe che si vuole iniettare</param>
        public abstract void Inject(WebApplicationBuilder builder, Type actualClass);

        /// <summary>
        /// Cerca tra tutte le classi disponibili nel thread corrente quelle che possono essere registrate come iniettabili dal dependecy injector e le aggiunge, lo scope è dato dalla specifica implementazione dell'attributo
        /// </summary>
        /// <param name="builder">Il builder che si occupa di creare la web app</param>
        public static void RegisterClasses(WebApplicationBuilder builder) {
            var classes = from a in AppDomain.CurrentDomain.GetAssemblies() from t in a.GetTypes() where t.IsDefined(typeof(Injectable), true) select t;
            foreach (var c in classes) {
                c.GetCustomAttribute<Injectable>()?.Inject(builder, c);
            }
        }
    }
}
