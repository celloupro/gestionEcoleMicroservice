package com.ecoleprimaire.professeur.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ecoleprimaire.professeur.web.rest.TestUtil;

public class AbscenceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Abscence.class);
        Abscence abscence1 = new Abscence();
        abscence1.setId(1L);
        Abscence abscence2 = new Abscence();
        abscence2.setId(abscence1.getId());
        assertThat(abscence1).isEqualTo(abscence2);
        abscence2.setId(2L);
        assertThat(abscence1).isNotEqualTo(abscence2);
        abscence1.setId(null);
        assertThat(abscence1).isNotEqualTo(abscence2);
    }
}
