using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Injectables {
    /// <summary>
    /// Associa alla classe l'attributo Transient che permetterà alla classe che lo possiede di essere registrata come transient nel dependency injector
    /// </summary>
    public class Transient: Injectable {
        
        /// <summary>
        /// Indica l'interfaccia di base da cui la classe eredita
        /// </summary>
        readonly Type? baseInterface;

        /// <summary>
        /// Indica che la classe a cui viene assegnato l'attributo Transient è iniettabile dal dependency injector come transient
        /// </summary>
        /// <param name="baseInterface">L'interfaccia base che implementa la classe</param>
        public Transient(Type? baseInterface = null) { 
            this.baseInterface = baseInterface;
        }

        public override void Inject(WebApplicationBuilder builder, Type actualClass) {
            if(baseInterface == null) {
                builder.Services.AddTransient(actualClass);
            } else {
                builder.Services.AddTransient(baseInterface, actualClass);
            }
        }

    }
}
